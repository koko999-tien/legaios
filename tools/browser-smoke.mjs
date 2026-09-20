import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const runtimeErrors = [];

page.on('pageerror', error => runtimeErrors.push(`pageerror: ${error.message}`));
page.on('console', message => {
  if (message.type() === 'error') runtimeErrors.push(`console.error: ${message.text()}`);
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function activePage(id) {
  return page.locator(`#${id}.page.on`).count();
}

async function go(id) {
  const trigger = page.locator(`[data-go="${id}"]`).first();
  assert(await trigger.count(), `Missing navigation trigger for ${id}`);
  await trigger.evaluate(el => el.click());
  await page.waitForFunction(pageId => document.getElementById(pageId)?.classList.contains('on'), id);
  assert(await activePage(id), `Page ${id} did not become active`);
}

async function assertNoHorizontalOverflow(label) {
  const report = await page.evaluate(() => {
    const viewport = window.innerWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const isIntentionallyOffCanvas = el => {
      if (el.closest('nav.links.side-nav:not(.open)')) return true;
      if (el.closest('.right-drawer:not(.on), .cmd-bg:not(.on), .drawer-scrim:not(.on), .nav-scrim:not(.on)')) return true;
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        const ps = getComputedStyle(parent);
        if (/(auto|scroll)/.test(ps.overflowX) && parent.scrollWidth > parent.clientWidth + 2) return true;
        parent = parent.parentElement;
      }
      return false;
    };
    const offenders = [...document.querySelectorAll('body *')]
      .filter(el => {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        if (isIntentionallyOffCanvas(el)) return false;
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return false;
        return rect.right > viewport + 2 || rect.left < -2;
      })
      .slice(0, 8)
      .map(el => {
        const r = el.getBoundingClientRect();
        return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${el.classList.length ? `.${[...el.classList].slice(0,2).join('.')}` : ''} [${Math.round(r.left)}, ${Math.round(r.right)}]`;
      });
    return { viewport, scrollWidth, offenders };
  });
  assert(report.scrollWidth <= report.viewport + 2, `${label}: horizontal overflow ${report.scrollWidth}px > ${report.viewport}px; offenders: ${report.offenders.join(', ') || 'unknown'}`);
  assert(report.offenders.length === 0, `${label}: visible elements are clipped outside the viewport: ${report.offenders.join(', ')}`);
}

async function assertHomeMobileGeometry(width) {
  const selectors = [
    'header.site',
    '#home .home113',
    '#home .compact-home-hero',
    '#home .home113-search-main',
    '#home .home113-primary-card',
    '#home .home113-tile'
  ];
  for (const selector of selectors) {
    const boxes = await page.locator(selector).evaluateAll(elements => elements.map(el => {
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, width: r.width, height: r.height };
    }));
    for (const box of boxes) {
      if (box.width <= 0 || box.height <= 0) continue;
      assert(box.left >= -2 && box.right <= width + 2, `mobile ${width}px: ${selector} is clipped [${Math.round(box.left)}, ${Math.round(box.right)}]`);
    }
  }
}

async function assertMobileSidebarScrollable(width) {
  await go('home');
  await page.locator('#menuBtn').click();
  await page.waitForFunction(() => document.getElementById('nav')?.classList.contains('open'));
  const more = page.locator('#navMore');
  if (await more.count() && !(await more.evaluate(el => el.open))) await more.locator(':scope > summary').click();
  const navInfo = await page.locator('#nav').evaluate(el => {
    const style = getComputedStyle(el);
    const before = el.scrollTop;
    el.scrollTop = Math.min(180, Math.max(0, el.scrollHeight - el.clientHeight));
    return {
      before,
      after: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      overflowY: style.overflowY,
      touchAction: style.touchAction
    };
  });
  assert(/auto|scroll/.test(navInfo.overflowY), `mobile ${width}px: sidebar overflow-y is ${navInfo.overflowY}`);
  if (navInfo.scrollHeight > navInfo.clientHeight + 1) {
    assert(navInfo.after > navInfo.before, `mobile ${width}px: expanded sidebar does not scroll`);
  }
  assert(navInfo.touchAction.includes('pan-y') || navInfo.touchAction === 'auto', `mobile ${width}px: sidebar touch-action is ${navInfo.touchAction}`);
  await page.locator('#navScrim').click();
  await page.waitForFunction(() => !document.getElementById('nav')?.classList.contains('open'));
}

async function assertCompactMobileText(width) {
  await go('lib');
  const suggest = page.locator('.search-suggest-row > span').first();
  if (await suggest.count()) {
    const box = await suggest.boundingBox();
    assert(box && box.width >= Math.min(180, width - 80), `mobile ${width}px: library suggestion label collapsed to ${Math.round(box?.width || 0)}px`);
  }

  await go('expert');
  const quality = page.locator('.compact-principles summary > small').first();
  if (await quality.count()) {
    const box = await quality.boundingBox();
    assert(box && box.width >= Math.min(160, width - 120), `mobile ${width}px: expert quality text collapsed to ${Math.round(box?.width || 0)}px`);
  }
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  assert((await page.title()).includes('Căn cứ Pháp lý Môi trường'), 'Document title does not contain the current brand');
  assert(await page.locator('meta[property="og:title"][content="Căn cứ Pháp lý Môi trường"]').count() === 1, 'Open Graph title metadata is missing');
  assert(await page.locator('meta[property="og:description"]').count() === 1, 'Open Graph description metadata is missing');
  assert(await page.locator('link[rel="manifest"][href="manifest.webmanifest"]').count() === 1, 'PWA manifest link is missing from the document head');
  assert(await page.locator('link[rel="icon"][href*="can-cu-phap-ly-moi-truong.svg"]').count() === 1, 'Brand favicon is missing');
  const structuredData=await page.locator('script[type="application/ld+json"]').textContent();
  assert(structuredData && JSON.parse(structuredData).name === 'Căn cứ Pháp lý Môi trường', 'WebSite structured data is missing or invalid');
  assert(await activePage('home'), 'Home page is not active after startup');

  // New users should see three plain-language starting points before advanced tools.
  assert((await page.locator('#home h1').textContent() || '').trim() === 'Tra cứu căn cứ. Theo dõi việc phải làm.', 'Home does not lead with the concrete legal-workbench proposition');
  const academicIdentity = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const h1 = getComputedStyle(document.querySelector('#home .academic-hero-copy h1'));
    const brandAccent = getComputedStyle(document.querySelector('.brand-copy b em')).color;
    const searchButton = getComputedStyle(document.querySelector('#home .academic-search-panel .bp')).backgroundColor;
    const hero = document.querySelector('#home .academic-home-hero');
    const firstCard = document.querySelector('#home .home113-primary-card');
    return {
      primary: root.getPropertyValue('--a').trim().toLowerCase(),
      fontFamily: h1.fontFamily.toLowerCase(),
      letterSpacing: h1.letterSpacing,
      brandAccent,
      searchButton,
      docMetric: document.getElementById('homeDocMetric')?.textContent?.trim() || '',
      topicMetric: document.getElementById('homeTopicMetric')?.textContent?.trim() || '',
      expectedDocs: String(D.length),
      expectedTopics: String(T.length),
      heroHeight: hero?.getBoundingClientRect().height || 0,
      firstCardHeight: firstCard?.getBoundingClientRect().height || 0,
      miniListDisplay: firstCard ? getComputedStyle(firstCard.querySelector('.card-mini-list')).display : ''
    };
  });
  assert(academicIdentity.primary === '#2563eb', `Application primary color should stay blue: ${academicIdentity.primary}`);
  assert(!academicIdentity.fontFamily.includes('georgia'), `Vietnamese academic heading regressed to Georgia: ${academicIdentity.fontFamily}`);
  assert(['rgb(31, 107, 76)','color(srgb 0.121569 0.419608 0.298039)'].includes(academicIdentity.brandAccent), `Brand highlighted word is not green: ${academicIdentity.brandAccent}`);
  assert(['rgb(37, 99, 235)','color(srgb 0.145098 0.388235 0.921569)'].includes(academicIdentity.searchButton), `Search button should remain blue: ${academicIdentity.searchButton}`);
  assert(academicIdentity.docMetric === academicIdentity.expectedDocs, `Home document metric is stale: ${academicIdentity.docMetric} vs ${academicIdentity.expectedDocs}`);
  assert(academicIdentity.topicMetric === academicIdentity.expectedTopics, `Home topic metric is stale: ${academicIdentity.topicMetric} vs ${academicIdentity.expectedTopics}`);
  assert(academicIdentity.heroHeight > 0 && academicIdentity.heroHeight < 380, `Home hero is too tall for a workbench: ${academicIdentity.heroHeight}px`);
  assert(academicIdentity.firstCardHeight > 0 && academicIdentity.firstCardHeight < 230, `Primary home card is too tall: ${academicIdentity.firstCardHeight}px`);
  assert(academicIdentity.miniListDisplay === 'none', 'Marketing-style mini chips should stay hidden on primary work actions');
  assert(await page.locator('#home .home113-primary-card').count() === 3, 'Home must expose exactly three primary starting points');
  const primaryRoutes = await page.locator('#home .home113-primary-card').evaluateAll(nodes => nodes.map(node => node.dataset.go));
  assert(JSON.stringify(primaryRoutes) === JSON.stringify(['lib','expert','work']), `Unexpected primary home routes: ${primaryRoutes.join(', ')}`);
  assert(await page.locator('#home .legal-trust-strip').count() === 1, 'Legal source/trust guidance is missing from home');
  assert(await page.locator('#home .home-tools-disclosure:not([open])').count() === 1, 'Advanced home tools should be collapsed by default');
  assert((await page.locator('#nav [data-go="expert"]').textContent() || '').includes('Rà soát hồ sơ'), 'Expert route still uses an unclear navigation label');

  assert(await page.locator('#nav > .nav-primary > button').count() === 4, 'Sidebar should expose four primary work routes');
  assert(await page.locator('#navMore:not([open])').count() === 1, 'Advanced sidebar tools should be collapsed on the home route');

  await go('corekb');
  assert(await page.locator('#navMore[open]').count() === 1, 'Advanced sidebar should reveal the active advanced route');
  await go('home');
  assert(await page.locator('#navMore:not([open])').count() === 1, 'Returning to a primary route should collapse advanced navigation');

  const routes = ['lib', 'corekb', 'memo', 'term', 'upd', 'expert', 'proc', 'cls', 'fee', 'work', 'import', 'info', 'home'];
  for (const id of routes) await go(id);

  await go('term');
  await page.locator('#tq').fill('ĐMC');
  await page.waitForTimeout(180);
  const dmcGlossary=(await page.locator('#tlist').innerText()).toLowerCase();
  assert(dmcGlossary.includes('đmc'),'Glossary search cannot find ĐMC');
  assert(dmcGlossary.includes('đánh giá môi trường chiến lược'),'ĐMC glossary expansion is missing the full term');
  await page.locator('#tq').fill('VOC');
  await page.waitForTimeout(120);
  const vocGlossary=(await page.locator('#tlist').innerText()).toLowerCase();
  assert(vocGlossary.includes('volatile organic compounds'),'Glossary search cannot resolve VOC');
  await page.locator('#tq').fill('XLNT');
  await page.waitForTimeout(120);
  const xlntGlossary=(await page.locator('#tlist').innerText()).toLowerCase();
  assert(xlntGlossary.includes('xử lý nước thải'),'Glossary search cannot resolve XLNT');
  await page.locator('#tq').fill('');
  await page.waitForTimeout(100);

  await go('info');
  assert(await page.locator('#info .info-card').count() === 4, 'Trust center should expose four policy/information cards');
  assert(await page.locator('footer [data-info-scroll]').count() === 4, 'Footer trust links are incomplete');
  assert((await page.locator('#infoAbout').innerText()).includes('không phải cổng thông tin của cơ quan nhà nước'), 'About section does not clarify independent/non-government status');
  assert((await page.locator('#infoPrivacy').innerText()).includes('lưu cục bộ'), 'Privacy section does not explain local browser storage');

  // Dossier review should explain the situation, missing questions and prioritized next steps.
  await go('expert');
  await page.evaluate(() => {
    document.getElementById('expPhase').value = 'operation';
    document.getElementById('expSector').value = 'industrial';
    document.getElementById('expLocation').value = 'KCN thử nghiệm';
    document.getElementById('expScale').value = '1.000 tấn/năm';
    document.getElementById('expWater').value = 'yes';
    analyzeExpert();
  });
  assert(await page.locator('#expOut .expert-situation').count() === 1, 'Expert review does not explain the interpreted situation');
  assert(await page.locator('#expOut .expert-next-plan li').count() > 0, 'Expert review does not provide prioritized next steps');
  assert(await page.locator('#expOut .expert-question-list li').count() > 0, 'Expert review does not surface unanswered questions');

  // Saved cases should expose a concrete next-action panel instead of only static classification.
  await go('work');
  await page.evaluate(() => {
    const qa = {
      id:'qa-case-guidance',name:'Hồ sơ QA',createdAt:new Date().toISOString(),userNote:'',
      input:{sector:'industrial'},
      result:{group:'Chưa kết luận',dtm:null,gp:null,notes:['Cần xác minh thêm quy mô và vị trí.']}
    };
    cases=[qa,...cases.filter(x=>x.id!==qa.id)];
    renderWorkspace();
    showCase(qa.id);
  });
  assert(await page.locator('#caseDetail .case-next-box').count() === 1, 'Workspace case is missing the next-action panel');
  assert(await page.locator('#caseDetail .case-next-list li').count() > 0, 'Workspace case has no actionable next steps');

  await go('home');
  await page.evaluate(() => renderHomePortal());
  assert((await page.locator('#homeResumeTitle').textContent() || '').includes('Hồ sơ QA'), 'Returning-user home card did not prioritize the latest saved case');

  // Library search should render usable results without throwing runtime errors.
  await go('lib');
  await page.locator('#q').fill('72/2020/QH14');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(150);
  const countText = (await page.locator('#dcount').textContent() || '').trim();
  assert(countText.length > 0, 'Library result count is empty after search');
  assert((await page.locator('#docs').innerHTML()).trim().length > 0, 'Library results container is empty');

  const libraryUx = await page.evaluate(() => {
    const groups=[...document.querySelectorAll('#chips .topic-filter-group')];
    const firstTag=document.querySelector('#docs.compact-view .meta .tag');
    const openAction=document.querySelector('#docs .doc-tools-v11 .goto-match');
    const previewAction=document.querySelector('#docs .doc-tools-v11 .preview-btn');
    return {
      groups:groups.length,
      collapsed:groups.filter(x=>!x.open).length,
      tagSize:firstTag?parseFloat(getComputedStyle(firstTag).fontSize):0,
      openText:openAction?.textContent?.trim()||'',
      openTitle:openAction?.getAttribute('title')||'',
      previewText:previewAction?.textContent?.trim()||'',
      previewTitle:previewAction?.getAttribute('title')||''
    };
  });
  assert(libraryUx.groups >= 3, `Expected grouped library filters, found ${libraryUx.groups}`);
  assert(libraryUx.collapsed >= 1, 'Library filter groups should reduce long-scroll fatigue by collapsing secondary groups');
  assert(libraryUx.tagSize >= 9, `Compact library metadata is still too small: ${libraryUx.tagSize}px`);
  assert(['Mở chi tiết','Đến đoạn khớp'].includes(libraryUx.openText), `Primary document action is unclear: ${libraryUx.openText}`);
  assert(libraryUx.openTitle.length > 10, 'Primary document action is missing explanatory hover text');
  assert(libraryUx.previewText === 'Xem nhanh', `Quick-preview action changed unexpectedly: ${libraryUx.previewText}`);
  assert(libraryUx.previewTitle.includes('tóm tắt'), 'Quick-preview action does not explain that it shows a summary');

  // Advanced legal-search facets should expose and remove active criteria without resetting the whole search.
  await page.locator('#scopeF').selectOption('core');
  await page.waitForTimeout(80);
  assert((await page.locator('#activeFilterList').innerText()).includes('Chuỗi pháp lý cốt lõi'), 'Active-filter panel did not expose the selected scope');
  assert(await page.locator('#activeFilterList [data-clear-filter="scope"]').count()===1, 'Active-filter scope chip is missing');
  await page.locator('#activeFilterList [data-clear-filter="scope"]').click();
  await page.waitForTimeout(80);
  assert(await page.locator('#scopeF').inputValue()==='all', 'Removing an active-filter chip did not reset only that criterion');
  assert(await page.locator('#advancedSearch').count() === 1, 'Advanced legal search panel is missing');
  assert(await page.locator('#effectF option[value="partial"]').count() === 1, 'Effect-metadata filter is missing the partial-effect option');
  if (!(await page.locator('#advancedSearch').evaluate(el => el.open))) await page.locator('#advancedSearch > summary').click();
  assert((await page.locator('#advancedSearch').innerText()).includes('không tự xác nhận tình trạng pháp lý'), 'Advanced search does not explain the legal-status metadata boundary');

  const firstDoc = page.locator('#docs [data-open]').first();
  if (await firstDoc.count()) {
    await firstDoc.evaluate(el => el.click());
    await page.waitForFunction(() => document.getElementById('art')?.classList.contains('on'));
    assert(await activePage('art'), 'Opening a library result did not activate article view');
    assert(await page.locator('#art [data-feedback-doc]').count() === 1, 'Article data-feedback action is missing');
    assert(await page.locator('#art .doc-breadcrumb').count() === 1, 'Article breadcrumb is missing');
    assert(await page.locator('#art .doc-record').count() === 1, 'Legal document record summary is missing');
    assert((await page.locator('#art .doc-record').innerText()).includes('Ngày hiệu lực (metadata)'), 'Document record does not distinguish effect metadata');
    assert((await page.locator('#art .doc-record').innerText()).includes('Không dùng riêng bảng này để kết luận'), 'Document record is missing the legal-status boundary');
    assert(await page.locator('#art .doc-section-nav [data-scroll="sourceSec"]').count() === 1, 'Document section navigation is missing source/relationship access');
    const articleTitle=(await page.locator('#art .art-content h1').textContent()||'').trim();
    await page.locator('#art [data-feedback-doc]').click();
    await page.waitForFunction(() => document.getElementById('feedbackModal')?.classList.contains('on'));
    await page.locator('#feedbackType').selectOption('Hiệu lực / sửa đổi');
    await page.locator('#feedbackNote').fill('Kiểm tra lại hiệu lực theo nguồn chính thức.');
    const report=await page.evaluate(() => feedbackReportText());
    assert(report.includes(articleTitle), 'Feedback report lost the current document context');
    assert(report.includes('Hiệu lực / sửa đổi'), 'Feedback report lost the selected issue type');
    assert(report.includes('Kiểm tra lại hiệu lực'), 'Feedback report lost the user note');
    await page.locator('#feedbackClose').click();
    await page.waitForFunction(() => !document.getElementById('feedbackModal')?.classList.contains('on'));
  }

  // Theme must toggle and persist across refresh via localStorage.
  await go('home');
  const themeBefore = await page.locator('body').getAttribute('data-theme');
  await page.locator('#theme').click();
  const themeAfter = await page.locator('body').getAttribute('data-theme');
  assert(themeBefore !== themeAfter, 'Theme button did not change data-theme');
  await page.reload({ waitUntil: 'networkidle' });
  assert((await page.locator('body').getAttribute('data-theme')) === themeAfter, 'Theme did not persist after reload');

  // Command palette should open, populate and close with Escape.
  await page.locator('#cmdOpen').click();
  await page.waitForFunction(() => document.getElementById('cmdBg')?.classList.contains('on'));
  await page.locator('#cmdQ').fill('Kho văn bản');
  await page.waitForTimeout(50);
  assert(await page.locator('#cmdList .cmd-item').count(), 'Command palette produced no result');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.getElementById('cmdBg')?.classList.contains('on'));

  // Mobile route/navigation and geometry checks.
  for (const width of [390, 360]) {
    await page.setViewportSize({ width, height: 844 });
    await page.reload({ waitUntil: 'networkidle' });
    for (const id of routes) {
      await go(id);
      await page.waitForTimeout(20);
      await assertNoHorizontalOverflow(`mobile ${width}px / ${id}`);
    }
    await go('home');
    await assertHomeMobileGeometry(width);
    await assertMobileSidebarScrollable(width);
    await assertCompactMobileText(width);
  }

  const mobileLibrary = page.locator('#mobileQuick [data-go="lib"]');
  assert(await mobileLibrary.count(), 'Mobile library navigation is missing');
  await mobileLibrary.evaluate(el => el.click());
  await page.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  assert(await activePage('lib'), 'Mobile quick navigation did not open the library');

  if (runtimeErrors.length) {
    throw new Error(`Browser runtime errors detected:\n${runtimeErrors.join('\n')}`);
  }

  console.log('Căn cứ Pháp lý Môi trường browser smoke test passed.');
  console.log(`  routes checked: ${routes.length}`);
  console.log('  library search and article open checked');
  console.log('  theme persistence checked');
  console.log('  command palette checked');
  console.log('  mobile quick navigation checked');
  console.log('  mobile sidebar scroll checked');
  console.log('  compact mobile text widths checked');
  console.log('  mobile clipping/overflow checks passed at 390px and 360px');
} finally {
  await browser.close();
}
