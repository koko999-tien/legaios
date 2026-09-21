import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function audit(page, label) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();

  const serious = result.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');

  console.log(`\nAccessibility audit: ${label}`);
  console.log(`  violations: ${result.violations.length}`);
  console.log(`  serious/critical: ${serious.length}`);
  for (const v of serious) {
    console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
    for (const node of v.nodes.slice(0, 8)) {
      const target = Array.isArray(node.target) ? node.target.join(' > ') : String(node.target || 'unknown');
      const summary = String(node.failureSummary || '').replace(/\s+/g, ' ').trim();
      console.log(`      ${target}${summary ? ` :: ${summary}` : ''}`);
    }
  }

  assert(serious.length === 0, `${label}: serious/critical accessibility violations found: ${serious.map(v => v.id).join(', ')}`);
}

try {
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const desktop = await desktopContext.newPage();
  await desktop.goto(baseURL, { waitUntil: 'networkidle' });
  await audit(desktop, 'desktop home');

  await desktop.evaluate(() => window.go?.('lib'));
  await desktop.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  await audit(desktop, 'desktop library');
  await desktopContext.close();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobile = await mobileContext.newPage();
  await mobile.goto(baseURL, { waitUntil: 'networkidle' });
  await audit(mobile, 'mobile home');

  await mobile.evaluate(() => window.go?.('lib'));
  await mobile.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  await audit(mobile, 'mobile library');

  await mobile.locator('#q').fill('72/2020/QH14');
  await mobile.locator('#qBtn').click();
  await mobile.waitForTimeout(150);
  const firstDoc = mobile.locator('#docs [data-open]').first();
  if (await firstDoc.count()) {
    await firstDoc.click();
    await mobile.waitForFunction(() => document.getElementById('art')?.classList.contains('on'));
    // Audit the settled page state; the page-entry opacity animation can otherwise create a transient false-positive contrast reading.
    await mobile.waitForTimeout(250);
    await audit(mobile, 'mobile article');
  }

  await mobileContext.close();
  console.log('\nLegalOS accessibility smoke test passed with no serious/critical violations.');
} finally {
  await browser.close();
}
