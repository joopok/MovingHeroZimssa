const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://localhost:7015...');
    
    // Set a reasonable timeout
    await page.goto('http://localhost:7015', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Page loaded successfully!');
    
    // Take a screenshot
    await page.screenshot({ 
      path: 'site-screenshot.png',
      fullPage: true 
    });
    console.log('Screenshot saved as site-screenshot.png');
    
    // Get page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check if main content is visible
    const heroSection = await page.isVisible('[data-testid="hero-section"], .hero-section, main');
    console.log('Main content visible:', heroSection);
    
    // Get any error messages if present
    const bodyText = await page.textContent('body');
    if (bodyText.includes('Error') || bodyText.includes('cannot') || bodyText.includes('failed')) {
      console.log('Possible error detected in page content');
    }
    
  } catch (error) {
    console.error('Error accessing the site:', error.message);
  } finally {
    await browser.close();
  }
})();