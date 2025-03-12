/**
 * @pattern VisualRegressionTest
 * @rule VisualConsistency
 * Visual regression tests for key application screens
 */
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
  });
  
  /**
   * @pattern ScreenshotTest
   * @rule VisualComparison
   * Test that verifies the visual appearance of the match list
   */
  test('match list visual appearance', async ({ page }) => {
    // Wait for match list to be visible
    await page.waitForSelector('[data-testid="match-list"]', { timeout: 5000 }).catch(() => {
      // If not found, we'll take a screenshot anyway to see what's rendered
      console.log('Match list not found, continuing with test...');
    });
    
    // Take a screenshot of the match list or main content area
    await expect(page.locator('main')).toHaveScreenshot('match-list-screen.png');
  });
  
  /**
   * @pattern ResponsiveTest
   * @rule ResponsiveDesign
   * Test that verifies responsive design at different viewport sizes
   */
  test('responsive design at different viewport sizes', async ({ page }) => {
    // Test desktop view (already set in beforeEach)
    await expect(page).toHaveScreenshot('desktop-view.png');
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500); // Allow time for responsive layout to adjust
    await expect(page).toHaveScreenshot('tablet-view.png');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500); // Allow time for responsive layout to adjust
    await expect(page).toHaveScreenshot('mobile-view.png');
  });
  
  /**
   * @pattern InteractionVisualTest
   * @rule InteractionFeedback
   * Test that verifies visual feedback during user interactions
   */
  test('visual feedback during interactions', async ({ page }) => {
    // Find a match card if available
    const hasMatchCard = await page.locator('[data-testid^="match-card-"]').count() > 0;
    
    if (!hasMatchCard) {
      console.log('No match cards found to test interactions');
      test.skip();
      return;
    }
    
    // Hover over a match card
    await page.locator('[data-testid^="match-card-"]').first().hover();
    await page.waitForTimeout(300); // Wait for hover effect
    await expect(page).toHaveScreenshot('match-card-hover.png');
    
    // Click on a match card
    await page.locator('[data-testid^="match-card-"]').first().click();
    
    // Wait for details page to load
    await page.waitForSelector('[data-testid="match-details"]', { timeout: 5000 }).catch(() => {
      console.log('Match details not found, continuing with test...');
    });
    
    // Take screenshot of details page
    await expect(page).toHaveScreenshot('match-details-page.png');
  });
  
  /**
   * @pattern ThemeVisualTest
   * @rule ThemeConsistency
   * Test that verifies visual consistency across different themes
   */
  test('visual consistency across themes', async ({ page }) => {
    // Check if theme toggle exists
    const hasThemeToggle = await page.locator('[data-testid="theme-toggle"]').count() > 0;
    
    if (!hasThemeToggle) {
      console.log('Theme toggle not found');
      test.skip();
      return;
    }
    
    // Take screenshot in default theme
    await expect(page).toHaveScreenshot('default-theme.png');
    
    // Toggle theme
    await page.locator('[data-testid="theme-toggle"]').click();
    await page.waitForTimeout(300); // Wait for theme transition
    
    // Take screenshot in alternate theme
    await expect(page).toHaveScreenshot('alternate-theme.png');
  });
}); 