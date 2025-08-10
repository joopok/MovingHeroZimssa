const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport for desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the page
  await page.goto('https://www.zimssa.com/service?type=move', { 
    waitUntil: 'networkidle' 
  });
  
  // Wait for the page to load
  await page.waitForTimeout(5000);
  
  // Get complete hero section HTML and computed styles
  const heroComplete = await page.evaluate(() => {
    const heroBanner = document.querySelector('.TopBanner_service-top-banner__OEs4Q');
    
    if (!heroBanner) return { error: 'Hero banner not found' };
    
    // Get all child elements
    const allChildren = heroBanner.querySelectorAll('*');
    const elementTree = [];
    
    allChildren.forEach(el => {
      // Skip text nodes
      if (el.nodeType !== 1) return;
      
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      
      // Only include visible elements
      if (rect.width > 0 && rect.height > 0) {
        elementTree.push({
          tagName: el.tagName,
          className: el.className,
          textContent: el.textContent?.trim().substring(0, 100),
          isVideo: el.tagName === 'VIDEO',
          isButton: el.tagName === 'BUTTON',
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          styles: {
            position: styles.position,
            display: styles.display,
            background: styles.background,
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            padding: styles.padding,
            margin: styles.margin,
            zIndex: styles.zIndex,
            opacity: styles.opacity,
            transform: styles.transform
          }
        });
      }
    });
    
    // Get gradient overlay if exists
    const gradientElements = Array.from(allChildren).filter(el => {
      const bg = window.getComputedStyle(el).background;
      return bg.includes('gradient') || bg.includes('rgba');
    });
    
    // Get text positioning
    const textElements = heroBanner.querySelectorAll('[class*="text"], [class*="title"], [class*="subtitle"]');
    const textPositioning = Array.from(textElements).map(el => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      return {
        className: el.className,
        text: el.textContent?.trim().substring(0, 50),
        position: {
          top: rect.top,
          left: rect.left,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2
        },
        styles: {
          position: styles.position,
          textAlign: styles.textAlign,
          display: styles.display,
          alignItems: styles.alignItems,
          justifyContent: styles.justifyContent
        }
      };
    });
    
    return {
      heroHTML: heroBanner.innerHTML.substring(0, 3000),
      heroClasses: heroBanner.className,
      dimensions: {
        width: heroBanner.offsetWidth,
        height: heroBanner.offsetHeight
      },
      elementTree: elementTree.slice(0, 20), // First 20 elements
      gradientElements: gradientElements.map(el => ({
        className: el.className,
        background: window.getComputedStyle(el).background
      })),
      textPositioning,
      containerStyles: {
        display: window.getComputedStyle(heroBanner).display,
        flexDirection: window.getComputedStyle(heroBanner).flexDirection,
        alignItems: window.getComputedStyle(heroBanner).alignItems,
        justifyContent: window.getComputedStyle(heroBanner).justifyContent,
        position: window.getComputedStyle(heroBanner).position
      }
    };
  });
  
  console.log('Complete Hero Section Analysis:');
  console.log(JSON.stringify(heroComplete, null, 2));
  
  // Check for any overlay or gradient div
  const overlayCheck = await page.evaluate(() => {
    const heroBanner = document.querySelector('.TopBanner_service-top-banner__OEs4Q');
    const allDivs = heroBanner.querySelectorAll('div');
    
    const overlays = [];
    allDivs.forEach(div => {
      const bg = window.getComputedStyle(div).background;
      const bgImage = window.getComputedStyle(div).backgroundImage;
      if (bg.includes('linear-gradient') || bgImage.includes('linear-gradient') || 
          bg.includes('rgba(0') || div.className.includes('overlay') || 
          div.className.includes('gradient')) {
        overlays.push({
          className: div.className,
          background: bg,
          backgroundImage: bgImage,
          position: window.getComputedStyle(div).position,
          dimensions: {
            width: div.offsetWidth,
            height: div.offsetHeight
          },
          zIndex: window.getComputedStyle(div).zIndex
        });
      }
    });
    
    return overlays;
  });
  
  console.log('\nOverlay/Gradient Elements:');
  console.log(JSON.stringify(overlayCheck, null, 2));
  
  await browser.close();
})();