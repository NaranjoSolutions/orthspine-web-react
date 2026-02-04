import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  // Capture Contact page
  await page.goto('http://localhost:4173/contact');
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'spanish-translation-contact-page.png',
    fullPage: false
  });
  console.log('Contact page screenshot saved');
  
  // Capture Services page
  await page.goto('http://localhost:4173/services');
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'spanish-translation-services-page.png',
    fullPage: false
  });
  console.log('Services page screenshot saved');
  
  // Capture About page
  await page.goto('http://localhost:4173/about');
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'spanish-translation-about-page.png',
    fullPage: false
  });
  console.log('About page screenshot saved');
  
  await browser.close();
})();
