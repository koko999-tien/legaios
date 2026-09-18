import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const libraryTrigger = page.locator('[data-go="lib"]').first();
  assert(await libraryTrigger.count(), 'Library navigation trigger is missing');
  await libraryTrigger.evaluate(el => el.click());
  await page.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  await page.locator('#q').fill('72/2020/QH14');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(120);
  const firstDoc = page.locator('#docs [data-open]').first();
  assert(await firstDoc.count(), 'No document result available for mobile article test');
  await firstDoc.click();
  await page.waitForFunction(() => document.getElementById('art')?.classList.contains('on'));

  assert(await page.locator('body').evaluate(el => el.classList.contains('article-view')), 'article-view body class is missing');
  const focusBox = await page.locator('#readFocus').boundingBox();
  assert(focusBox && focusBox.width >= 80, `Focus button is too narrow: ${Math.round(focusBox?.width || 0)}px`);
  const progress = page.locator('#readingProgress');
  await page.waitForFunction(() => document.getElementById('readingProgress')?.classList.contains('on'));
  const progressDisplay = await progress.evaluate(el => getComputedStyle(el).display);
  assert(progressDisplay !== 'none', `Smart reading progress should be visible on mobile article view, got ${progressDisplay}`);
  const progressBox = await progress.boundingBox();
  const viewportWidth = await page.evaluate(() => innerWidth);
  assert(
    progressBox && progressBox.x >= -2 && progressBox.x + progressBox.width <= viewportWidth + 2,
    `Smart reading progress exceeds the mobile viewport: left=${progressBox?.x}, right=${progressBox ? progressBox.x + progressBox.width : 'n/a'}, viewport=${viewportWidth}`
  );
  assert(await page.locator('#readingProgressMeta').count(), 'Smart reading progress metadata is missing');
  const mobileNavDisplay = await page.locator('#mobileQuick').evaluate(el => getComputedStyle(el).display);
  assert(mobileNavDisplay === 'none', `Bottom mobile nav should be hidden while reading an article, got ${mobileNavDisplay}`);

  const overflow = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert(overflow.scrollWidth <= overflow.width + 2, `Mobile article overflows horizontally: ${overflow.scrollWidth}px > ${overflow.width}px`);

  console.log('Mobile article layout test passed.');
} finally {
  await browser.close();
}
