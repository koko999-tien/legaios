import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];

page.on('pageerror', error => errors.push(error.message));
page.on('console', message => {
  if (message.type() === 'error') errors.push(message.text());
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fontSize(selector) {
  const locator = page.locator(selector).first();
  assert(await locator.count(), `Missing selector: ${selector}`);
  return Number.parseFloat(await locator.evaluate(el => getComputedStyle(el).fontSize));
}

async function go(id) {
  const trigger = page.locator(`[data-go="${id}"]`).first();
  assert(await trigger.count(), `Missing route trigger: ${id}`);
  await trigger.evaluate(el => el.click());
  await page.waitForFunction(pageId => document.getElementById(pageId)?.classList.contains('on'), id);
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });

  assert(await fontSize('.compact-card-body p') >= 11.5, 'Home primary-card copy is too small.');
  assert(await fontSize('.compact-tile small') >= 10, 'Home support copy is too small.');
  assert(await fontSize('.home113-card-foot') >= 10.5, 'Home card footer copy is too small.');

  await go('lib');
  assert(await fontSize('.search-suggest-row button') >= 10, 'Library suggestion chips are too small.');
  assert(await fontSize('.citation-note') >= 10, 'Library citation helper copy is too small.');

  await go('corekb');
  assert(await fontSize('.guide-card-v131 p') >= 10, 'Core-knowledge guidance copy is too small.');
  assert(await fontSize('.corekb-stats-clickable>button small') >= 9.5, 'Core-knowledge stat helper copy is too small.');

  await page.setViewportSize({ width: 390, height: 844 });
  await go('home');
  assert(await page.locator('#home .compact-home-search').isVisible(), 'Primary home search must remain visible on phones.');
  assert(await page.locator('#home .compact-primary-card').count() === 3, 'Home must keep exactly three primary jobs on phones.');
  assert(await page.locator('#home .compact-primary-card').first().isVisible(), 'Primary home job cards must remain visible on phones.');
  assert(await page.locator('#home .legal-trust-strip').isVisible(), 'Legal source guidance must remain visible on phones.');
  assert(await page.locator('#home .home-tools-disclosure:not([open])').count() === 1, 'Advanced tools must stay collapsed by default on phones.');

  const geometry = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  assert(geometry.scrollWidth <= geometry.viewport + 2, `UX polish introduced horizontal overflow: ${geometry.scrollWidth}px > ${geometry.viewport}px`);

  if (errors.length) throw new Error(`Browser runtime errors detected:\n${errors.join('\n')}`);

  console.log('LegalOS UX polish smoke test passed.');
  console.log('  home hierarchy/readability checked');
  console.log('  library helper readability checked');
  console.log('  core-knowledge helper readability checked');
  console.log('  mobile newcomer hierarchy and collapsed advanced tools checked');
} finally {
  await browser.close();
}
