import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
};

export default async function () {
    const page = await browser.newPage();

    // Generate a random email
    const randomStr = Math.random().toString(36).substring(2, 10);
    const email = `k6user_${randomStr}@dispostable.com`;

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    await page.locator('#input-firstname').type('k6');
    await page.locator('#input-lastname').type('demo');
    await page.locator('#input-email').type(email);
    await page.locator('#input-telephone').type('1234567890');
    await page.locator('#input-password').type('Test123!!');
    await page.locator('#input-confirm').type('Test123!!');

    // Fix checkbox selection
    await page.locator('input[type="checkbox"]').check();

    // Fix form submission
    const submit = page.locator('input[type="submit"]');
    await Promise.all([page.waitForNavigation(), submit.click()]);

    // Take a full-page screenshot
    await page.screenshot({ fullPage: true, path: 'screenshots/test1.png' });

    // Fix validation check
    const successMessage = await page.locator('h1').textContent();
    check(successMessage, {
        'Text Validation': (text) => text === "Your Account Has Been Created!"
    });

    await page.close();
}
