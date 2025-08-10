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
  
  // Scroll to top to ensure we're at the hero section
  await page.evaluate(() => window.scrollTo(0, 0));
  
  // Check for video element anywhere on the page
  const videoInfo = await page.evaluate(() => {
    const videos = document.querySelectorAll('video');
    return {
      hasVideo: videos.length > 0,
      videoCount: videos.length,
      videos: Array.from(videos).map(v => ({
        src: v.src || v.querySelector('source')?.src || null,
        poster: v.poster,
        autoplay: v.autoplay,
        muted: v.muted,
        loop: v.loop,
        width: v.width,
        height: v.height,
        style: v.getAttribute('style'),
        className: v.className,
        parentClassName: v.parentElement?.className
      }))
    };
  });
  
  console.log('Video Info:', JSON.stringify(videoInfo, null, 2));
  
  // Get the first viewport content
  const firstViewport = await page.evaluate(() => {
    // Get all content in the first viewport height
    const viewportHeight = window.innerHeight;
    const elements = [];
    
    // Find all major sections
    const allSections = document.querySelectorAll('section, main, header, div[class*="hero"], div[class*="banner"], div[class*="landing"]');
    
    allSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.top >= -100) {
        const headings = section.querySelectorAll('h1, h2, h3');
        const paragraphs = section.querySelectorAll('p');
        const buttons = section.querySelectorAll('button, a[class*="btn"], a[class*="button"]');
        const images = section.querySelectorAll('img');
        
        elements.push({
          tag: section.tagName,
          className: section.className,
          position: {
            top: rect.top,
            height: rect.height
          },
          background: window.getComputedStyle(section).background,
          backgroundColor: window.getComputedStyle(section).backgroundColor,
          headings: Array.from(headings).slice(0, 3).map(h => ({
            text: h.textContent.trim(),
            tag: h.tagName,
            className: h.className,
            styles: {
              fontSize: window.getComputedStyle(h).fontSize,
              fontWeight: window.getComputedStyle(h).fontWeight,
              color: window.getComputedStyle(h).color,
              textAlign: window.getComputedStyle(h).textAlign
            }
          })),
          paragraphs: Array.from(paragraphs).slice(0, 3).map(p => ({
            text: p.textContent.trim().substring(0, 100),
            className: p.className,
            styles: {
              fontSize: window.getComputedStyle(p).fontSize,
              color: window.getComputedStyle(p).color
            }
          })),
          buttons: Array.from(buttons).slice(0, 3).map(btn => ({
            text: btn.textContent.trim(),
            className: btn.className,
            href: btn.href || null,
            styles: {
              backgroundColor: window.getComputedStyle(btn).backgroundColor,
              color: window.getComputedStyle(btn).color,
              borderRadius: window.getComputedStyle(btn).borderRadius
            }
          })),
          images: Array.from(images).slice(0, 2).map(img => ({
            src: img.src,
            alt: img.alt,
            width: img.width,
            height: img.height
          }))
        });
      }
    });
    
    return elements;
  });
  
  console.log('\nFirst Viewport Content:');
  console.log(JSON.stringify(firstViewport, null, 2));
  
  // Check if there's a main header/navigation
  const navigation = await page.evaluate(() => {
    const nav = document.querySelector('nav, header, div[class*="header"], div[class*="navigation"]');
    if (nav) {
      return {
        className: nav.className,
        height: window.getComputedStyle(nav).height,
        position: window.getComputedStyle(nav).position,
        background: window.getComputedStyle(nav).background
      };
    }
    return null;
  });
  
  console.log('\nNavigation:', JSON.stringify(navigation, null, 2));
  
  // Take screenshots
  await page.screenshot({ 
    path: 'zimssa-hero-desktop.png',
    fullPage: false
  });
  
  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  await page.screenshot({ 
    path: 'zimssa-hero-mobile.png',
    fullPage: false
  });
  
  await browser.close();
})();