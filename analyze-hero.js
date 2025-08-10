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
  
  // Wait for the hero section to load
  await page.waitForTimeout(3000);
  
  // Extract hero section details
  const heroData = await page.evaluate(() => {
    const hero = document.querySelector('section') || document.querySelector('[class*="hero"]') || document.querySelector('main > div:first-child');
    
    if (!hero) {
      // Try to find the first major section
      const firstSection = document.querySelector('body > div > div:first-child');
      if (firstSection) {
        return {
          html: firstSection.outerHTML.substring(0, 5000),
          hasVideo: !!firstSection.querySelector('video'),
          videoSrc: firstSection.querySelector('video')?.src || null,
          styles: window.getComputedStyle(firstSection)
        };
      }
      return { error: 'No hero section found' };
    }
    
    const video = hero.querySelector('video');
    const headings = hero.querySelectorAll('h1, h2, h3');
    const buttons = hero.querySelectorAll('button, a[class*="btn"]');
    
    return {
      html: hero.outerHTML.substring(0, 5000),
      hasVideo: !!video,
      videoSrc: video?.src || video?.querySelector('source')?.src || null,
      videoAttributes: video ? {
        autoplay: video.autoplay,
        muted: video.muted,
        loop: video.loop,
        playsinline: video.playsInline
      } : null,
      headings: Array.from(headings).map(h => ({
        tag: h.tagName,
        text: h.textContent.trim(),
        styles: {
          fontSize: window.getComputedStyle(h).fontSize,
          fontWeight: window.getComputedStyle(h).fontWeight,
          color: window.getComputedStyle(h).color,
          fontFamily: window.getComputedStyle(h).fontFamily,
          lineHeight: window.getComputedStyle(h).lineHeight
        }
      })),
      buttons: Array.from(buttons).map(btn => ({
        text: btn.textContent.trim(),
        href: btn.href || null,
        styles: {
          backgroundColor: window.getComputedStyle(btn).backgroundColor,
          color: window.getComputedStyle(btn).color,
          padding: window.getComputedStyle(btn).padding,
          borderRadius: window.getComputedStyle(btn).borderRadius,
          fontSize: window.getComputedStyle(btn).fontSize
        }
      })),
      containerStyles: {
        width: window.getComputedStyle(hero).width,
        height: window.getComputedStyle(hero).height,
        padding: window.getComputedStyle(hero).padding,
        background: window.getComputedStyle(hero).background
      }
    };
  });
  
  console.log('Hero Section Analysis:');
  console.log(JSON.stringify(heroData, null, 2));
  
  // Take a screenshot of the hero section
  await page.screenshot({ 
    path: 'hero-desktop.png',
    clip: { x: 0, y: 0, width: 1920, height: 800 }
  });
  
  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: 'hero-mobile.png',
    clip: { x: 0, y: 0, width: 375, height: 600 }
  });
  
  await browser.close();
})();