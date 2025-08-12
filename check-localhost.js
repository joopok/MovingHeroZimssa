const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const urls = [
    'http://localhost:7015',
    'http://127.0.0.1:7015',
    'http://[::1]:7015',
    'http://192.168.0.109:7015'
  ];
  
  for (const url of urls) {
    console.log(`\n========================================`);
    console.log(`Checking URL: ${url}`);
    
    try {
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });
      
      const status = response ? response.status() : 'No response';
      console.log(`Response status: ${status}`);
      
      if (response && response.ok()) {
        console.log('✅ URL is accessible!');
        console.log(`Page title: ${await page.title()}`);
        
        await page.screenshot({ 
          path: `screenshot-${url.replace(/[^a-z0-9]/gi, '_')}.png`,
          fullPage: true 
        });
        console.log(`Screenshot saved`);
        
        // Get some page info
        const content = await page.content();
        console.log(`Content preview (first 200 chars): ${content.substring(0, 200)}...`);
      } else {
        console.log(`⚠️ URL responded with status: ${status}`);
      }
      
    } catch (error) {
      console.error('❌ Failed to access URL');
      console.error(`Error: ${error.message.split('\n')[0]}`);
    }
  }
  
  await browser.close();
})();