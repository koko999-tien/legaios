import { chromium } from 'playwright';

const baseURL = process.env.LEGALOS_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const runtimeErrors = [];

page.on('pageerror', error => runtimeErrors.push(`pageerror: ${error.message}`));
page.on('console', message => {
  if (message.type() === 'error') runtimeErrors.push(`console.error: ${message.text()}`);
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function openKnownDocument() {
  const lib = page.locator('[data-go="lib"]').first();
  await lib.evaluate(el => el.click());
  await page.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  await page.locator('#q').fill('72/2020/QH14');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(160);
  const first = page.locator('#docs [data-open]').first();
  assert(await first.count(), 'No legal document available for reading-progress test');
  const docId = await first.getAttribute('data-open');
  assert(docId, 'Document id is missing');
  await first.evaluate(el => el.click());
  await page.waitForFunction(() => document.getElementById('art')?.classList.contains('on'));
  await page.waitForFunction(() => document.getElementById('readingProgress')?.classList.contains('on'));
  return docId;
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const docId = await openKnownDocument();

  const bar = page.locator('#readingProgress');
  assert(await bar.isVisible(), 'Smart reading progress is not visible');
  assert(await page.locator('#readingProgressTrack').count(), 'Reading progress track is missing');
  const desktopShellBox = await page.locator('.reading-progress-shell').boundingBox();
  const desktopTrackBox = await page.locator('#readingProgressTrack').boundingBox();
  const headerBox = await page.locator('header.site').boundingBox();
  const siteInBox = await page.locator('header.site .site-in').boundingBox();
  const progressBox = await bar.boundingBox();
  const mountedInHeader = await bar.evaluate(el => el.parentElement?.matches('header.site') || false);
  assert(mountedInHeader, 'Reading progress is not mounted inside the sticky header');
  assert(
    headerBox && siteInBox && progressBox &&
    Math.abs(progressBox.y - (siteInBox.y + siteInBox.height)) <= 2 &&
    Math.abs((progressBox.y + progressBox.height) - (headerBox.y + headerBox.height)) <= 2,
    'Reading progress is not the second row of the sticky header'
  );
  assert(desktopShellBox && progressBox && desktopShellBox.width >= progressBox.width * 0.9, `Desktop reading progress shell is not full-width enough: ${Math.round(desktopShellBox?.width || 0)}px of ${Math.round(progressBox?.width || 0)}px`);
  assert(desktopShellBox && desktopShellBox.height <= 46, `Desktop reading progress shell is too tall: ${Math.round(desktopShellBox?.height || 0)}px`);
  assert(desktopTrackBox && progressBox && desktopTrackBox.width >= progressBox.width * 0.9 && desktopTrackBox.height <= 6, 'Desktop reading progress track is not full-width/compact');
  assert(await page.locator('#readingProgressSection').count(), 'Reading section label is missing');
  assert(await page.locator('#readingProgressMeta').count(), 'Reading progress metadata is missing');

  const initialMeta = (await page.locator('#readingProgressMeta').textContent() || '').trim();
  assert(initialMeta.includes('%'), `Reading metadata does not contain percentage: ${initialMeta}`);
  assert(/phút|Đã đọc xong/.test(initialMeta), `Reading metadata does not contain reading-time context: ${initialMeta}`);

  await page.evaluate(() => {
    const target = document.querySelector('#legalText');
    const rect = target.getBoundingClientRect();
    const top = scrollY + rect.top;
    const y = top + Math.max(0, target.scrollHeight * 0.55) - Math.min(innerHeight * 0.42, 360);
    scrollTo({ top: Math.max(0, y), behavior: 'auto' });
  });
  await page.waitForTimeout(900);

  const midValue = Number(await page.locator('#readingProgressTrack').getAttribute('aria-valuenow'));
  assert(midValue >= 20 && midValue <= 95, `Mid-document progress is implausible: ${midValue}%`);
  const stickyGeometry = await page.evaluate(() => {
    const header = document.querySelector('header.site')?.getBoundingClientRect();
    const bar = document.getElementById('readingProgress')?.getBoundingClientRect();
    return header && bar ? { headerTop: header.top, barTop: bar.top, headerBottom: header.bottom, barBottom: bar.bottom } : null;
  });
  assert(stickyGeometry && Math.abs(stickyGeometry.headerTop) <= 2, 'Header is not sticky while reading');
  assert(stickyGeometry && stickyGeometry.barTop >= stickyGeometry.headerTop && Math.abs(stickyGeometry.barBottom - stickyGeometry.headerBottom) <= 2, 'Reading progress does not scroll together with the sticky header');
  const section = (await page.locator('#readingProgressSection').textContent() || '').trim();
  assert(section.length > 0, 'Current reading section is empty');

  const stored = await page.evaluate(id => {
    const raw = localStorage.getItem('v14_reading_progress');
    const data = raw ? JSON.parse(raw) : {};
    return data[id] || null;
  }, docId);
  assert(stored && stored.pct >= 2, 'Reading position was not persisted');
  assert(stored.updatedAt > 0, 'Reading position timestamp is missing');

  const track = page.locator('#readingProgressTrack');
  const trackBox = await track.boundingBox();
  assert(trackBox && trackBox.width > 100, 'Reading progress track is too small');
  await track.click({ position: { x: trackBox.width * 0.78, y: Math.max(1, trackBox.height / 2) } });
  await page.waitForTimeout(650);
  const jumped = Number(await track.getAttribute('aria-valuenow'));
  assert(jumped >= 60, `Click-to-jump did not move far enough: ${jumped}%`);

  await page.locator('#art [data-go="lib"]').first().click();
  await page.waitForFunction(() => document.getElementById('lib')?.classList.contains('on'));
  await page.locator('#q').fill('72/2020/QH14');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(120);
  const same = page.locator(`#docs [data-open="${docId}"]`).first();
  assert(await same.count(), 'Could not reopen the same document');
  await same.evaluate(el => el.click());
  await page.waitForFunction(() => document.getElementById('art')?.classList.contains('on'));
  await page.waitForFunction(() => !document.getElementById('readingResume')?.hidden);

  const resume = page.locator('#readingResume');
  const resumeText = (await resume.textContent() || '').trim();
  assert(/Tiếp tục \d+%/.test(resumeText), `Resume action does not show saved progress: ${resumeText}`);
  await resume.click();
  await page.waitForTimeout(650);
  const resumedValue = Number(await page.locator('#readingProgressTrack').getAttribute('aria-valuenow'));
  assert(resumedValue >= 40, `Resume did not restore meaningful reading progress: ${resumedValue}%`);

  await page.locator('#readingProgressTrack').focus();
  await page.keyboard.press('End');
  await page.waitForTimeout(650);
  const endValue = Number(await page.locator('#readingProgressTrack').getAttribute('aria-valuenow'));
  assert(endValue >= 90, `Keyboard End did not jump near document end: ${endValue}%`);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(120);
  const mobileBox = await bar.boundingBox();
  assert(mobileBox && mobileBox.x >= -2 && mobileBox.x + mobileBox.width <= 392, 'Reading progress overflows the 390px mobile viewport');
  const overflow = await page.evaluate(() => ({ viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert(overflow.scrollWidth <= overflow.viewport + 2, `Reading progress introduced horizontal overflow: ${overflow.scrollWidth}px > ${overflow.viewport}px`);

  if (runtimeErrors.length) throw new Error(`Browser runtime errors detected:\n${runtimeErrors.join('\n')}`);

  console.log('Smart reading progress test passed.');
  console.log('  legal-text-only progress checked');
  console.log('  current section and remaining-time context checked');
  console.log('  click/keyboard navigation checked');
  console.log('  per-document resume persistence checked');
  console.log('  390px mobile geometry checked');
} finally {
  await browser.close();
}
