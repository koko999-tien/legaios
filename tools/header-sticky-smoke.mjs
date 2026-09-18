import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function go(id) {
  const trigger = page.locator(`[data-go="${id}"]`).first();
  assert(await trigger.count(), `Missing navigation trigger for ${id}`);
  await trigger.evaluate(el => el.click());
  await page.waitForFunction(pageId => document.getElementById(pageId)?.classList.contains('on'), id);
  await page.waitForTimeout(60);
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });

  const routes = ['home','lib','corekb','memo','term','upd','expert','proc','cls','fee','work','import'];
  for (const id of routes) {
    await go(id);
    const style = await page.locator('header.site').evaluate(el => ({
      position: getComputedStyle(el).position,
      top: getComputedStyle(el).top
    }));
    assert(style.position === 'sticky', `Header is not sticky on ${id}: ${style.position}`);
    assert(style.top === '0px', `Header top is not 0 on ${id}: ${style.top}`);

    const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight));
    if (maxScroll > 120) {
      await page.evaluate(y => scrollTo({ top: Math.min(y, 520), behavior: 'auto' }), maxScroll);
      await page.waitForTimeout(80);
      const box = await page.locator('header.site').boundingBox();
      assert(box && Math.abs(box.y) <= 2, `Header scrolled away on ${id}: y=${box?.y}`);
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'auto' }));
      await page.waitForTimeout(30);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await go('corekb');
  const maxScrollMobile = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight));
  if (maxScrollMobile > 120) {
    await page.evaluate(y => scrollTo({ top: Math.min(y, 480), behavior: 'auto' }), maxScrollMobile);
    await page.waitForTimeout(80);
    const box = await page.locator('header.site').boundingBox();
    assert(box && Math.abs(box.y) <= 2, `Mobile header scrolled away: y=${box?.y}`);
  }

  const overflow = await page.evaluate(() => ({
    viewport: innerWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  assert(overflow.scrollWidth <= overflow.viewport + 2, `Global sticky-header fix introduced horizontal overflow: ${overflow.scrollWidth}px > ${overflow.viewport}px`);

  console.log('LegalOS global sticky-header test passed.');
  console.log(`  routes checked: ${routes.length}`);
  console.log('  desktop scroll persistence checked');
  console.log('  mobile sticky behavior checked');
  console.log('  horizontal overflow checked');
} finally {
  await browser.close();
}
