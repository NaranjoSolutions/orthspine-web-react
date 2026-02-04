import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  // Navigate to home page
  await page.goto('http://localhost:4173');
  await page.waitForTimeout(3000); // Wait for content to load
  
  // Take screenshot
  await page.screenshot({ 
    path: 'spanish-translation-homepage-screenshot.png',
    fullPage: true
  });
  
  console.log('Screenshot saved as spanish-translation-homepage-screenshot.png');
  
  await browser.close();
})();
