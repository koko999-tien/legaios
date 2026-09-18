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
  assert((await page.title()).includes('LegalOS'), 'Document title does not contain LegalOS');
  assert(await activePage('home'), 'Home page is not active after startup');

  // New users should see three plain-language starting points before advanced tools.
  assert((await page.locator('#home h1').textContent() || '').trim() === 'Bạn cần làm gì hôm nay?', 'Home does not lead with the user task question');
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

  const routes = ['lib', 'corekb', 'memo', 'term', 'upd', 'expert', 'proc', 'cls', 'fee', 'work', 'import', 'home'];
  for (const id of routes) await go(id);

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

  const firstDoc = page.locator('#docs [data-open]').first();
  if (await firstDoc.count()) {
    await firstDoc.evaluate(el => el.click());
    await page.waitForFunction(() => document.getElementById('art')?.classList.contains('on'));
    assert(await activePage('art'), 'Opening a library result did not activate article view');
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

  console.log('LegalOS browser smoke test passed.');
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
