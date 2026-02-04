const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to Contact page...');
    await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    // Screenshot 1: Contact Action Cards
    console.log('Capturing Contact Action Cards...');
    const actionCardsElement = await page.locator('.actionCardsContainer').first();
    if (await actionCardsElement.isVisible()) {
      await actionCardsElement.screenshot({ path: 'screenshot-contact-action-cards.png' });
      console.log('✓ Screenshot saved: screenshot-contact-action-cards.png');
    }

    // Screenshot 2: Clinic Information Cards
    console.log('Capturing Clinic Information Cards...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);
    const infoCardsElement = await page.locator('.infoCardsContainer').first();
    if (await infoCardsElement.isVisible()) {
      await infoCardsElement.screenshot({ path: 'screenshot-clinic-info-cards.png' });
      console.log('✓ Screenshot saved: screenshot-clinic-info-cards.png');
    }

    // Screenshot 3: Full Contact page
    console.log('Capturing full Contact page...');
    await page.screenshot({ path: 'screenshot-contact-page-full.png', fullPage: true });
    console.log('✓ Screenshot saved: screenshot-contact-page-full.png');

    console.log('\n✓ All screenshots captured successfully!');
    console.log('Screenshots saved in:', path.resolve('.'));
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
})();
