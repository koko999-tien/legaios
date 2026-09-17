import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.locator('#menuBtn').click();
  await page.waitForFunction(() => document.getElementById('nav')?.classList.contains('open'));

  const state = await page.evaluate(() => {
    const nav = document.getElementById('nav');
    const scrim = document.getElementById('navScrim');
    const button = nav?.querySelector('[data-go="lib"]');
    if (!nav || !scrim || !button) return null;
    const r = button.getBoundingClientRect();
    const x = Math.max(r.left + 8, Math.min(r.right - 8, r.left + r.width / 2));
    const y = Math.max(r.top + 8, Math.min(r.bottom - 8, r.top + r.height / 2));
    const hit = document.elementFromPoint(x, y);
    return {
      hitInsideNav: !!hit?.closest('#nav'),
      navZ: getComputedStyle(nav).zIndex,
      headerZ: getComputedStyle(document.querySelector('header.site')).zIndex,
      scrimZ: getComputedStyle(scrim).zIndex,
      scrimOn: scrim.classList.contains('on')
    };
  });

  assert(state, 'Could not inspect mobile sidebar');
  assert(state.scrimOn, 'Sidebar scrim did not open');
  assert(state.hitInsideNav, `Sidebar is covered by another layer (header z=${state.headerZ}, nav z=${state.navZ}, scrim z=${state.scrimZ})`);

  // Use a real Playwright click, not DOM .click(), so an overlay would make this fail.
  await page.locator('#nav [data-go="lib"]').click();
  await page.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  assert(!(await page.locator('#nav').evaluate(el => el.classList.contains('open'))), 'Sidebar stayed open after choosing a menu item');

  await page.locator('#menuBtn').click();
  await page.waitForFunction(() => document.getElementById('nav')?.classList.contains('open'));
  await page.locator('#navScrim').click({ position: { x: 380, y: 300 } }).catch(async () => {
    // Fallback: click a visible point on the scrim outside the drawer.
    await page.mouse.click(380, 300);
  });
  await page.waitForFunction(() => !document.getElementById('nav')?.classList.contains('open'));

  console.log('Mobile sidebar is above the scrim and accepts real taps.');
} finally {
  await browser.close();
}
