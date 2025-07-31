import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = await browser.newPage();
  
  try {
    // Navigate to page
    await page.goto('https://test.k6.io/my_messages.php');
    
    // Fill login form
    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');
    
    // Submit form
    await page.locator('input[type="submit"]').click();
    
    // Wait for navigation
    await page.waitForSelector('h2');
    
    // Verify login success
    const heading = await page.locator('h2').textContent();
    check(page, {
      'login successful': () => heading === 'Welcome, admin!',
    });
    
    // Take screenshot (optional)
    await page.screenshot({ path: 'login-success.png' });
    
  } finally {
    await page.close();
  }
}