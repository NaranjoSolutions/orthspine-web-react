import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    // Navigate to home page
    console.log('Navigating to homepage...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations to settle
    
    // Find the testimonials section
    const testimonialsSection = await page.locator('section').filter({ hasText: 'Testimonios de Pacientes' }).first();
    
    if (testimonialsSection) {
      console.log('Found testimonials section, taking screenshot...');
      
      // Scroll to testimonials section
      await testimonialsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      // Take screenshot of the testimonials section
      await testimonialsSection.screenshot({ 
        path: 'testimonial-carousel-updated.png',
      });
      
      console.log('Screenshot saved as testimonial-carousel-updated.png');
      
      // Also take a full page screenshot
      await page.screenshot({ 
        path: 'homepage-testimonial-full.png',
        fullPage: true
      });
      
      console.log('Full page screenshot saved as homepage-testimonial-full.png');
    } else {
      console.log('Testimonials section not found');
    }
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  } finally {
    await browser.close();
  }
})();
