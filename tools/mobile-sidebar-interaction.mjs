import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForSidebarOpen() {
  await page.waitForFunction(() => document.getElementById('nav')?.classList.contains('open'));
  await page.waitForTimeout(260);
  await page.waitForFunction(() => {
    const nav = document.getElementById('nav');
    if (!nav) return false;
    const rect = nav.getBoundingClientRect();
    return Math.abs(rect.left) <= 2 && rect.right > 100;
  });
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });

  const menuGeometry = await page.evaluate(() => {
    const btn = document.getElementById('menuBtn');
    const line = btn?.querySelector(':scope > span');
    if (!btn || !line) return null;
    const b = btn.getBoundingClientRect();
    const r = line.getBoundingClientRect();
    const base = getComputedStyle(line);
    const before = getComputedStyle(line, '::before');
    const after = getComputedStyle(line, '::after');
    return {
      buttonCenterX: b.left + b.width / 2,
      buttonCenterY: b.top + b.height / 2,
      lineCenterX: r.left + r.width / 2,
      lineCenterY: r.top + r.height / 2,
      widths: [base.width, before.width, after.width].map(parseFloat),
      heights: [base.height, before.height, after.height].map(parseFloat),
      beforeTop: parseFloat(before.top),
      afterTop: parseFloat(after.top),
      beforeLeft: parseFloat(before.left),
      afterLeft: parseFloat(after.left)
    };
  });
  assert(menuGeometry, 'Could not inspect mobile hamburger geometry');
  assert(menuGeometry.widths.every(w => Math.abs(w - menuGeometry.widths[0]) <= 0.1), `Hamburger lines are not equal width: ${menuGeometry.widths.join(', ')}`);
  assert(menuGeometry.heights.every(h => Math.abs(h - menuGeometry.heights[0]) <= 0.1), `Hamburger lines are not equal height: ${menuGeometry.heights.join(', ')}`);
  assert(Math.abs(menuGeometry.lineCenterX - menuGeometry.buttonCenterX) <= 0.75, `Hamburger is not horizontally centered: line=${menuGeometry.lineCenterX}, button=${menuGeometry.buttonCenterX}`);
  assert(Math.abs(menuGeometry.lineCenterY - menuGeometry.buttonCenterY) <= 0.75, `Hamburger is not vertically centered: line=${menuGeometry.lineCenterY}, button=${menuGeometry.buttonCenterY}`);
  assert(Math.abs(menuGeometry.beforeTop + menuGeometry.afterTop) <= 0.1, `Hamburger vertical spacing is not symmetric: ${menuGeometry.beforeTop}, ${menuGeometry.afterTop}`);
  assert(Math.abs(menuGeometry.beforeLeft) <= 0.1 && Math.abs(menuGeometry.afterLeft) <= 0.1, `Hamburger outer lines are horizontally offset: ${menuGeometry.beforeLeft}, ${menuGeometry.afterLeft}`);

  await page.locator('#menuBtn').click();
  await waitForSidebarOpen();

  const state = await page.evaluate(() => {
    const nav = document.getElementById('nav');
    const scrim = document.getElementById('navScrim');
    const button = nav?.querySelector('[data-go="lib"]');
    if (!nav || !scrim || !button) return null;
    const navRect = nav.getBoundingClientRect();
    const scrimRect = scrim.getBoundingClientRect();
    const r = button.getBoundingClientRect();
    const x = Math.max(r.left + 8, Math.min(r.right - 8, r.left + r.width / 2));
    const y = Math.max(r.top + 8, Math.min(r.bottom - 8, r.top + r.height / 2));
    const hit = document.elementFromPoint(x, y);
    const hitPath = [];
    let node = hit;
    for (let i = 0; node && i < 5; i++, node = node.parentElement) {
      hitPath.push(`${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ''}${node.classList?.length ? `.${[...node.classList].join('.')}` : ''}`);
    }
    return {
      hitInsideNav: !!hit?.closest('#nav'),
      hitPath: hitPath.join(' > '),
      point: `${Math.round(x)},${Math.round(y)}`,
      navLeft: navRect.left,
      navRight: navRect.right,
      scrimLeft: scrimRect.left,
      navZ: getComputedStyle(nav).zIndex,
      headerZ: getComputedStyle(document.querySelector('header.site')).zIndex,
      scrimZ: getComputedStyle(scrim).zIndex,
      scrimOn: scrim.classList.contains('on')
    };
  });

  assert(state, 'Could not inspect mobile sidebar');
  assert(state.scrimOn, 'Sidebar scrim did not open');
  assert(Math.abs(state.navLeft) <= 2, `Sidebar transition did not finish; nav left=${state.navLeft}`);
  assert(state.scrimLeft >= state.navRight - 2, `Scrim overlaps sidebar: scrim left=${state.scrimLeft}, nav right=${state.navRight}`);
  assert(state.hitInsideNav, `Sidebar is covered at ${state.point} by ${state.hitPath || 'unknown'} (header z=${state.headerZ}, nav z=${state.navZ}, scrim z=${state.scrimZ})`);

  // Use a real Playwright click, not DOM .click(), so an overlay would make this fail.
  await page.locator('#nav [data-go="lib"]').click();
  await page.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  await page.waitForFunction(() => !document.getElementById('navScrim')?.classList.contains('on'));
  assert(!(await page.locator('#nav').evaluate(el => el.classList.contains('open'))), 'Sidebar stayed open after choosing a menu item');
  assert(!(await page.locator('#navScrim').evaluate(el => el.classList.contains('on'))), 'Scrim stayed visible after choosing a menu item');

  await page.locator('#menuBtn').click();
  await waitForSidebarOpen();
  await page.mouse.click(380, 300);
  await page.waitForFunction(() => !document.getElementById('nav')?.classList.contains('open'));
  await page.waitForFunction(() => !document.getElementById('navScrim')?.classList.contains('on'));

  console.log('Mobile sidebar opens cleanly, accepts real taps, and closes without a stale scrim.');
} finally {
  await browser.close();
}
