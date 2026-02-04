import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size for desktop view
  await page.setViewportSize({ width: 1280, height: 720 });
  
  try {
    console.log('Navigating to login page...');
    // Navigate to login page (correct path is /login, not /auth/login)
    await page.goto('http://localhost:5173/login', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Waiting for page to load...');
    // Wait for the page to render
    await page.waitForTimeout(3000);
    
    // Log the current URL
    console.log('Current URL:', page.url());
    
    // Check if we have the admin portal title
    const title = await page.textContent('h1').catch(() => 'not found');
    console.log('H1 Title:', title);
    
    // Take screenshot
    await page.screenshot({ 
      path: '/tmp/admin-login-page-updated.png',
      fullPage: true
    });
    
    console.log('Screenshot saved to /tmp/admin-login-page-updated.png');
    
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    // Try to take a screenshot anyway
    try {
      await page.screenshot({ 
        path: '/tmp/admin-login-page-error.png',
        fullPage: true
      });
      console.log('Error screenshot saved to /tmp/admin-login-page-error.png');
    } catch (e) {
      console.error('Could not save error screenshot:', e);
    }
  } finally {
    await browser.close();
  }
})();
