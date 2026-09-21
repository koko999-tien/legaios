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
  assert((await page.title()).includes('Căn cứ Pháp lý Môi trường'), 'Site did not load before PWA test');

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
  assert(controlled, 'Page is not controlled by its service worker after reload');

  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  assert(manifestHref?.includes('manifest.webmanifest'), 'Web manifest link is missing');

  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert((await page.title()).includes('Căn cứ Pháp lý Môi trường'), 'Offline reload did not restore the application shell');
  assert(await page.locator('#home.page.on').count(), 'Offline reload did not restore the home page');
  const offlineModules = await page.evaluate(() => ({
    router: Boolean(window.LEGALOS_URL_ROUTER?.ready),
    recovery: Boolean(window.LEGALOS_RECOVERY?.ready),
    shortcuts: Boolean(window.LEGALOS_EXTENDED_SHORTCUTS?.ready),
    audit: Boolean(window.LEGALOS_ACTIVITY_AUDIT?.ready),
    b2b: Boolean(window.LEGALOS_B2B_EXPERIENCE?.ready),
    lifecycle: Boolean(window.LEGALOS_PROJECT_LIFECYCLE?.ready)
  }));
  assert(offlineModules.router, 'Offline reload lost URL router');
  assert(offlineModules.recovery, 'Offline reload lost workspace recovery');
  assert(offlineModules.shortcuts, 'Offline reload lost extended shortcuts');
  assert(offlineModules.audit, 'Offline reload lost activity audit');
  assert(offlineModules.b2b, 'Offline reload lost B2B legal experience');
  assert(offlineModules.lifecycle, 'Offline reload lost project lifecycle dashboard');
  await context.setOffline(false);

  console.log('Căn cứ Pháp lý Môi trường PWA/offline smoke test passed.');
} finally {
  await context.setOffline(false).catch(() => {});
  await browser.close();
}
