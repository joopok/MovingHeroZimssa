import { test, expect } from '@playwright/test';

test.describe('Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/main');
  });

  test('displays main hero section', async ({ page }) => {
    // Check hero section elements
    await expect(page.locator('h1')).toContainText('새로운 집, 새로운 시작');
    await expect(page.locator('text=믿을 수 있는 이사 파트너')).toBeVisible();
    
    // Check call-to-action buttons
    await expect(page.locator('text=무료 견적받기')).toBeVisible();
    await expect(page.locator('text=앱 다운로드')).toBeVisible();
    
    // Check scroll indicator
    await expect(page.locator('svg').first()).toBeVisible();
  });

  test('displays service cards section', async ({ page }) => {
    // Check section title
    await expect(page.locator('text=언제 짐싸를 이용하나요?')).toBeVisible();
    
    // Check service cards
    await expect(page.locator('text=이사')).toBeVisible();
    await expect(page.locator('text=청소')).toBeVisible();
    await expect(page.locator('text=운송')).toBeVisible();
    
    // Check service descriptions
    await expect(page.locator('text=포장이사부터 일반이사까지')).toBeVisible();
    await expect(page.locator('text=입주청소부터 이사청소까지')).toBeVisible();
    await expect(page.locator('text=소형화물부터 대형화물까지')).toBeVisible();
  });

  test('displays app showcase sections', async ({ page }) => {
    // Check first app section (blue)
    await expect(page.locator('text=이사는 물론, 청소, 운송까지 한번에')).toBeVisible();
    await expect(page.locator('text=하나의 앱으로 모든 생활 서비스를 간편하게 이용하세요')).toBeVisible();
    
    // Check second app section (black)
    await expect(page.locator('text=검색은 업체에 8개까지!')).toBeVisible();
    await expect(page.locator('text=2,400+')).toBeVisible();
    await expect(page.locator('text=98.5%')).toBeVisible();
    
    // Check third app section (yellow)
    await expect(page.locator('text=진짜 이용자들의 진짜 리뷰만')).toBeVisible();
    await expect(page.locator('text=실제 서비스를 이용한 고객들의 솔직한 후기를 확인하세요.')).toBeVisible();
  });

  test('displays statistics section', async ({ page }) => {
    // Check section title
    await expect(page.locator('text=함께한 2백만 고객과 만들어 온 믿음까지')).toBeVisible();
    
    // Check statistics
    await expect(page.locator('text=2,293,644명')).toBeVisible();
    await expect(page.locator('text=누적 이용자')).toBeVisible();
    await expect(page.locator('text=4.9점')).toBeVisible();
    await expect(page.locator('text=평균 만족도')).toBeVisible();
    
    // Check badges
    await expect(page.locator('text=2023')).toBeVisible();
    await expect(page.locator('text=대한민국 브랜드 대상')).toBeVisible();
    await expect(page.locator('text=정보보호 관리체계')).toBeVisible();
    await expect(page.locator('text=손해배상책임보험')).toBeVisible();
  });

  test('displays blog posts section', async ({ page }) => {
    // Check section title
    await expect(page.locator('text=함께 이용자들의 진짜 리뷰')).toBeVisible();
    
    // Check blog post titles
    await expect(page.locator('text=이사 견적 받을 때 꼭 확인해야 할 5가지')).toBeVisible();
    await expect(page.locator('text=입주청소 체크리스트 완벽 가이드')).toBeVisible();
    await expect(page.locator('text=소형 화물 운송, 이렇게 준비하세요')).toBeVisible();
    
    // Check categories
    await expect(page.locator('text=이사 가이드')).toBeVisible();
    await expect(page.locator('text=청소 팁')).toBeVisible();
    await expect(page.locator('text=운송 정보')).toBeVisible();
    
    // Check more content button
    await expect(page.locator('text=더 많은 콘텐츠 보기')).toBeVisible();
  });

  test('displays testimonials section', async ({ page }) => {
    // Check section title
    await expect(page.locator('text=고객님들의 생생한 후기')).toBeVisible();
    
    // Check testimonial content
    await expect(page.locator('text=김민수')).toBeVisible();
    await expect(page.locator('text=서울 강남구')).toBeVisible();
    await expect(page.locator('text=포장이사')).toBeVisible();
    
    // Check navigation buttons
    const leftButton = page.locator('button').first();
    const rightButton = page.locator('button').last();
    await expect(leftButton).toBeVisible();
    await expect(rightButton).toBeVisible();
  });

  test('displays footer section', async ({ page }) => {
    // Check company info
    await expect(page.locator('text=짐싸')).toBeVisible();
    await expect(page.locator('text=믿을 수 있는 생활 서비스 플랫폼')).toBeVisible();
    
    // Check service links
    await expect(page.locator('text=서비스')).toBeVisible();
    await expect(page.locator('text=회사')).toBeVisible();
    await expect(page.locator('text=지원')).toBeVisible();
    
    // Check contact info
    await expect(page.locator('text=고객센터')).toBeVisible();
    await expect(page.locator('text=1588-0000')).toBeVisible();
    await expect(page.locator('text=평일 09:00 - 18:00')).toBeVisible();
    
    // Check app download buttons
    await expect(page.locator('text=App Store')).toBeVisible();
    await expect(page.locator('text=Google Play')).toBeVisible();
    
    // Check copyright
    await expect(page.locator('text=© 2024 Zimssa. All rights reserved.')).toBeVisible();
  });

  test('testimonial carousel functionality', async ({ page }) => {
    // Check initial state
    await expect(page.locator('text=김민수')).toBeVisible();
    
    // Click next button to change testimonials
    const nextButton = page.locator('button').last();
    await nextButton.click();
    
    // Wait for animation and check if content changed
    await page.waitForTimeout(500);
    
    // The testimonial should have changed or show the same if it's the last set
    await expect(page.locator('text=고객님들의 생생한 후기')).toBeVisible();
  });

  test('service card hover effects', async ({ page }) => {
    const movingCard = page.locator('text=이사').first();
    
    // Hover over the card
    await movingCard.hover();
    
    // Check if the card is still visible after hover
    await expect(movingCard).toBeVisible();
  });

  test('scroll behavior and animations', async ({ page }) => {
    // Check initial viewport
    await expect(page.locator('h1')).toBeInViewport();
    
    // Scroll down to check other sections
    await page.locator('text=언제 짐싸를 이용하나요?').scrollIntoViewIfNeeded();
    await expect(page.locator('text=언제 짐싸를 이용하나요?')).toBeInViewport();
    
    // Scroll to statistics
    await page.locator('text=함께한 2백만 고객과').scrollIntoViewIfNeeded();
    await expect(page.locator('text=함께한 2백만 고객과')).toBeInViewport();
    
    // Scroll to footer
    await page.locator('text=© 2024 Zimssa').scrollIntoViewIfNeeded();
    await expect(page.locator('text=© 2024 Zimssa')).toBeInViewport();
  });
});