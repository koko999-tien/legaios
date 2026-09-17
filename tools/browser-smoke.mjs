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
    const offenders = [...document.querySelectorAll('body *')]
      .filter(el => {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
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
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  assert((await page.title()).includes('LegalOS'), 'Document title does not contain LegalOS');
  assert(await activePage('home'), 'Home page is not active after startup');

  const routes = ['lib', 'corekb', 'memo', 'term', 'upd', 'expert', 'proc', 'cls', 'fee', 'work', 'import', 'home'];
  for (const id of routes) await go(id);

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
    const headerBox = await page.locator('header.site').boundingBox();
    assert(headerBox && headerBox.x >= -1 && headerBox.x + headerBox.width <= width + 1, `mobile ${width}px: header exceeds viewport`);
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
  console.log('  mobile horizontal-overflow checks passed at 390px and 360px');
} finally {
  await browser.close();
}
