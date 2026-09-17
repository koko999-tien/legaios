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
  const critical = result.violations.filter(v => v.impact === 'critical');

  console.log(`\nAccessibility audit: ${label}`);
  console.log(`  violations: ${result.violations.length}`);
  console.log(`  serious/critical: ${serious.length}`);
  for (const v of serious) {
    console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
  }

  assert(critical.length === 0, `${label}: critical accessibility violations found: ${critical.map(v => v.id).join(', ')}`);
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await desktop.goto(baseURL, { waitUntil: 'networkidle' });
  await audit(desktop, 'desktop home');

  await desktop.evaluate(() => window.go?.('lib'));
  await desktop.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  await audit(desktop, 'desktop library');
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
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
    await audit(mobile, 'mobile article');
  }

  await mobile.close();
  console.log('\nLegalOS accessibility smoke test completed without critical violations.');
} finally {
  await browser.close();
}
