import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'allow' });
const page = await context.newPage();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  assert((await page.title()).includes('LegalOS'), 'LegalOS did not load before PWA test');

  const registration = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return { supported: false };
    const ready = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_, reject) => setTimeout(() => reject(new Error('service worker ready timeout')), 8000))
    ]);
    return { supported: true, scope: ready.scope, active: ready.active?.state || null };
  });
  assert(registration.supported, 'Service workers are not supported in test browser');
  assert(registration.active === 'activated', `Service worker is not activated: ${registration.active}`);

  // Reload once so the page is controlled by the newly activated worker.
  await page.reload({ waitUntil: 'networkidle' });
  const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
  assert(controlled, 'LegalOS page is not controlled by its service worker after reload');

  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  assert(manifestHref?.includes('manifest.webmanifest'), 'Web manifest link is missing');

  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert((await page.title()).includes('LegalOS'), 'Offline reload did not restore LegalOS shell');
  assert(await page.locator('#home.page.on').count(), 'Offline reload did not restore the home page');
  await context.setOffline(false);

  console.log('LegalOS PWA/offline smoke test passed.');
} finally {
  await context.setOffline(false).catch(() => {});
  await browser.close();
}
