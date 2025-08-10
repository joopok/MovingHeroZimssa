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
  
  // Get detailed hero section information
  const heroDetails = await page.evaluate(() => {
    // Find the hero banner
    const heroBanner = document.querySelector('.TopBanner_service-top-banner__OEs4Q') || 
                       document.querySelector('[class*="TopBanner"]');
    
    if (!heroBanner) return { error: 'Hero banner not found' };
    
    // Get video container details
    const videoContainer = heroBanner.querySelector('.TopBanner_video-container__PZ0f1') ||
                          heroBanner.querySelector('[class*="video-container"]');
    const video = heroBanner.querySelector('video');
    
    // Get text content
    const textWrapper = heroBanner.querySelector('.TopBanner_text-wrapper__hBBh8') ||
                       heroBanner.querySelector('[class*="text-wrapper"]');
    
    // Get all text elements
    const titles = heroBanner.querySelectorAll('[class*="title"], h1, h2, h3');
    const subtitles = heroBanner.querySelectorAll('[class*="subtitle"], [class*="sub-title"]');
    const descriptions = heroBanner.querySelectorAll('[class*="description"], p');
    
    // Get button
    const button = heroBanner.querySelector('button, [class*="btn"]');
    
    // Get overlay
    const overlay = heroBanner.querySelector('[class*="overlay"], [class*="gradient"]');
    
    return {
      heroSection: {
        className: heroBanner.className,
        dimensions: {
          width: heroBanner.offsetWidth,
          height: heroBanner.offsetHeight
        },
        styles: {
          position: window.getComputedStyle(heroBanner).position,
          overflow: window.getComputedStyle(heroBanner).overflow,
          background: window.getComputedStyle(heroBanner).background,
          zIndex: window.getComputedStyle(heroBanner).zIndex
        }
      },
      videoContainer: videoContainer ? {
        className: videoContainer.className,
        styles: {
          position: window.getComputedStyle(videoContainer).position,
          top: window.getComputedStyle(videoContainer).top,
          left: window.getComputedStyle(videoContainer).left,
          width: window.getComputedStyle(videoContainer).width,
          height: window.getComputedStyle(videoContainer).height,
          zIndex: window.getComputedStyle(videoContainer).zIndex,
          overflow: window.getComputedStyle(videoContainer).overflow
        }
      } : null,
      video: video ? {
        src: video.src || video.querySelector('source')?.src,
        attributes: {
          autoplay: video.autoplay,
          muted: video.muted,
          loop: video.loop,
          playsInline: video.playsInline
        },
        styles: {
          width: window.getComputedStyle(video).width,
          height: window.getComputedStyle(video).height,
          objectFit: window.getComputedStyle(video).objectFit,
          position: window.getComputedStyle(video).position
        }
      } : null,
      textContent: {
        wrapper: textWrapper ? {
          className: textWrapper.className,
          styles: {
            position: window.getComputedStyle(textWrapper).position,
            zIndex: window.getComputedStyle(textWrapper).zIndex,
            padding: window.getComputedStyle(textWrapper).padding,
            maxWidth: window.getComputedStyle(textWrapper).maxWidth,
            margin: window.getComputedStyle(textWrapper).margin,
            textAlign: window.getComputedStyle(textWrapper).textAlign,
            top: window.getComputedStyle(textWrapper).top,
            left: window.getComputedStyle(textWrapper).left,
            transform: window.getComputedStyle(textWrapper).transform
          }
        } : null,
        titles: Array.from(titles).map(t => ({
          text: t.textContent.trim(),
          className: t.className,
          tagName: t.tagName,
          styles: {
            fontSize: window.getComputedStyle(t).fontSize,
            fontWeight: window.getComputedStyle(t).fontWeight,
            lineHeight: window.getComputedStyle(t).lineHeight,
            color: window.getComputedStyle(t).color,
            margin: window.getComputedStyle(t).margin,
            fontFamily: window.getComputedStyle(t).fontFamily,
            letterSpacing: window.getComputedStyle(t).letterSpacing
          }
        })),
        subtitles: Array.from(subtitles).map(s => ({
          text: s.textContent.trim(),
          className: s.className,
          styles: {
            fontSize: window.getComputedStyle(s).fontSize,
            fontWeight: window.getComputedStyle(s).fontWeight,
            color: window.getComputedStyle(s).color,
            margin: window.getComputedStyle(s).margin
          }
        })),
        descriptions: Array.from(descriptions).map(d => ({
          text: d.textContent.trim(),
          className: d.className,
          styles: {
            fontSize: window.getComputedStyle(d).fontSize,
            color: window.getComputedStyle(d).color,
            lineHeight: window.getComputedStyle(d).lineHeight,
            margin: window.getComputedStyle(d).margin
          }
        }))
      },
      button: button ? {
        text: button.textContent.trim(),
        className: button.className,
        styles: {
          backgroundColor: window.getComputedStyle(button).backgroundColor,
          color: window.getComputedStyle(button).color,
          padding: window.getComputedStyle(button).padding,
          borderRadius: window.getComputedStyle(button).borderRadius,
          fontSize: window.getComputedStyle(button).fontSize,
          fontWeight: window.getComputedStyle(button).fontWeight,
          border: window.getComputedStyle(button).border,
          margin: window.getComputedStyle(button).margin,
          display: window.getComputedStyle(button).display,
          width: window.getComputedStyle(button).width,
          height: window.getComputedStyle(button).height,
          cursor: window.getComputedStyle(button).cursor,
          transition: window.getComputedStyle(button).transition
        }
      } : null,
      overlay: overlay ? {
        className: overlay.className,
        styles: {
          position: window.getComputedStyle(overlay).position,
          background: window.getComputedStyle(overlay).background,
          width: window.getComputedStyle(overlay).width,
          height: window.getComputedStyle(overlay).height,
          zIndex: window.getComputedStyle(overlay).zIndex
        }
      } : null
    };
  });
  
  console.log('Hero Section Detailed Analysis:');
  console.log(JSON.stringify(heroDetails, null, 2));
  
  // Get mobile responsive details
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const mobileHeroDetails = await page.evaluate(() => {
    const heroBanner = document.querySelector('.TopBanner_service-top-banner__OEs4Q') || 
                       document.querySelector('[class*="TopBanner"]');
    
    if (!heroBanner) return { error: 'Hero banner not found' };
    
    const textWrapper = heroBanner.querySelector('[class*="text-wrapper"]');
    const button = heroBanner.querySelector('button, [class*="btn"]');
    
    return {
      heroSection: {
        dimensions: {
          width: heroBanner.offsetWidth,
          height: heroBanner.offsetHeight
        }
      },
      textWrapper: textWrapper ? {
        styles: {
          padding: window.getComputedStyle(textWrapper).padding,
          fontSize: window.getComputedStyle(textWrapper).fontSize
        }
      } : null,
      button: button ? {
        styles: {
          width: window.getComputedStyle(button).width,
          height: window.getComputedStyle(button).height,
          fontSize: window.getComputedStyle(button).fontSize,
          padding: window.getComputedStyle(button).padding
        }
      } : null
    };
  });
  
  console.log('\nMobile Hero Details:');
  console.log(JSON.stringify(mobileHeroDetails, null, 2));
  
  await browser.close();
})();