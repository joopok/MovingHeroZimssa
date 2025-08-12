const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const url = 'http://192.168.0.109:7015';
  console.log(`Checking URL: ${url}`);
  
  try {
    // Try to navigate to the URL with a 30 second timeout
    const response = await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Check response status
    const status = response ? response.status() : 'No response';
    console.log(`Response status: ${status}`);
    
    if (response && response.ok()) {
      console.log('✅ URL is accessible!');
      console.log(`Page title: ${await page.title()}`);
      
      // Take a screenshot
      await page.screenshot({ 
        path: 'url-check-screenshot.png',
        fullPage: true 
      });
      console.log('Screenshot saved as url-check-screenshot.png');
    } else {
      console.log(`⚠️ URL responded with status: ${status}`);
      await page.screenshot({ 
        path: 'url-check-error-screenshot.png',
        fullPage: true 
      });
      console.log('Error screenshot saved as url-check-error-screenshot.png');
    }
    
    // Get page content info
    const content = await page.content();
    console.log(`Page content length: ${content.length} characters`);
    
  } catch (error) {
    console.error('❌ Failed to access URL:');
    console.error(`Error type: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    
    // Try to take a screenshot even if there's an error
    try {
      await page.screenshot({ 
        path: 'url-check-error-screenshot.png',
        fullPage: true 
      });
      console.log('Error screenshot saved as url-check-error-screenshot.png');
    } catch (screenshotError) {
      console.log('Could not take screenshot');
    }
  } finally {
    await browser.close();
  }
})();