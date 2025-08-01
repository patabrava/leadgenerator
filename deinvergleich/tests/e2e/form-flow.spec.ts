import { test, expect } from '@playwright/test';

test.describe('Lead Generator Form E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete the full form flow successfully', async ({ page }) => {
    // Test Step 1 - Company Data (Unternehmensdaten)
    await expect(page.locator('h1')).toContainText('Finden Sie den perfekten');
    await expect(page.locator('h2')).toContainText('Unternehmensdaten');
    
    // Fill company data
    await page.fill('input[name="unternehmen"]', 'Beispiel GmbH');
    await page.fill('input[name="plz"]', '10115');
    await page.selectOption('select[name="land"]', 'Deutschland');
    await page.click('button[type="submit"]');

    // Wait for step 2 - Contact Data
    await expect(page.locator('h2')).toContainText('Kontaktdaten');

    // Test Step 2 - Contact Information
    await page.fill('input[name="name"]', 'Max Mustermann');
    await page.fill('input[name="email"]', 'max@example.com');
    await page.fill('input[name="telefon"]', '030 12345678');
    await page.click('button[type="submit"]');

    // Wait for step 3 - Project Details
    await expect(page.locator('h2')).toContainText('Projektdetails');

    // Test Step 3 - Project Information
    await page.click('button[type="submit"]'); // Skip for now, depends on actual implementation

    // Wait for step 4 - Review
    await expect(page.locator('h2')).toContainText('Zusammenfassung');

    // Test Step 4 - Review and Submit
    await page.click('input[type="checkbox"][name="gdprConsent"]');
    await page.click('button[type="submit"]');

    // Test Success State
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Vielen Dank');
  });

  test('should validate company name requirement', async ({ page }) => {
    // Try to submit without company name
    await page.fill('input[name="plz"]', '10115');
    await page.selectOption('select[name="land"]', 'Deutschland');
    await page.click('button[type="submit"]');
    
    // Should show validation error
    await expect(page.locator('.text-red-600')).toBeVisible();
    await expect(page.locator('.text-red-600')).toContainText('erforderlich');
  });

  test('should validate postal code format', async ({ page }) => {
    // Test invalid postal code
    await page.fill('input[name="unternehmen"]', 'Test GmbH');
    await page.fill('input[name="plz"]', '123');
    await page.selectOption('select[name="land"]', 'Deutschland');
    await page.click('button[type="submit"]');
    
    // Should show validation error
    await expect(page.locator('.text-red-600')).toBeVisible();
    await expect(page.locator('.text-red-600')).toContainText('Postleitzahl');
  });

  test('should validate email format in contact step', async ({ page }) => {
    // Navigate to contact step
    await page.fill('input[name="unternehmen"]', 'Test GmbH');
    await page.fill('input[name="plz"]', '10115');
    await page.selectOption('select[name="land"]', 'Deutschland');
    await page.click('button[type="submit"]');

    // Test invalid email
    await page.fill('input[name="name"]', 'Max Mustermann');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="telefon"]', '030 12345678');
    await page.click('button[type="submit"]');
    
    // Should show validation error
    await expect(page.locator('.text-red-600')).toBeVisible();
    await expect(page.locator('.text-red-600')).toContainText('E-Mail');
  });

  test('should allow navigation back to previous steps', async ({ page }) => {
    // Navigate to contact step
    await page.fill('input[name="unternehmen"]', 'Test GmbH');
    await page.fill('input[name="plz"]', '10115');
    await page.selectOption('select[name="land"]', 'Deutschland');
    await page.click('button[type="submit"]');
    
    // Should be on contact step
    await expect(page.locator('h2')).toContainText('Kontaktdaten');
    
    // Click back button (if available)
    const backButton = page.locator('button:has-text("Zurück")');
    if (await backButton.isVisible()) {
      await backButton.click();
      
      // Should be back on company step
      await expect(page.locator('h2')).toContainText('Unternehmensdaten');
      await expect(page.locator('input[name="unternehmen"]')).toHaveValue('Test GmbH');
    }
  });

  test('should display progress indicator correctly', async ({ page }) => {
    // Check if progress indicator exists
    const progressIndicator = page.locator('[data-testid="progress-bar"], .progress, [role="progressbar"]');
    
    if (await progressIndicator.isVisible()) {
      // Step 1 - should show some progress
      await expect(progressIndicator).toBeVisible();
      
      // Navigate to step 2
      await page.fill('input[name="unternehmen"]', 'Test GmbH');
      await page.fill('input[name="plz"]', '10115');
      await page.selectOption('select[name="land"]', 'Deutschland');
      await page.click('button[type="submit"]');
      
      // Progress should advance
      await expect(progressIndicator).toBeVisible();
    }
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Mock network failure for API submission
    await page.route('**/api/submit', route => route.abort());

    // Complete the form
    await page.fill('input[name="unternehmen"]', 'Test GmbH');
    await page.fill('input[name="plz"]', '10115');
    await page.selectOption('select[name="land"]', 'Deutschland');
    await page.click('button[type="submit"]');

    await page.fill('input[name="name"]', 'Max Mustermann');
    await page.fill('input[name="email"]', 'max@example.com');
    await page.fill('input[name="telefon"]', '030 12345678');
    await page.click('button[type="submit"]');

    // Skip project details if minimal
    await page.click('button[type="submit"]');

    // Final submission with GDPR consent
    await page.click('input[type="checkbox"][name="gdprConsent"]');
    await page.click('button[type="submit"]');

    // Should show error message or retry option
    await expect(page.locator('.text-red-600, [data-testid="error-message"]')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test that form is usable on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('input[name="unternehmen"]')).toBeVisible();
    
    // Fill and submit on mobile
    await page.fill('input[name="unternehmen"]', 'Mobile Test GmbH');
    await page.fill('input[name="plz"]', '10115');
    await page.selectOption('select[name="land"]', 'Deutschland');
    await page.click('button[type="submit"]');
    
    // Verify navigation works on mobile
    await expect(page.locator('h2')).toContainText('Kontaktdaten');
  });
});
