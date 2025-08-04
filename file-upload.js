import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {
    const page = await browser.newPage();

    await page.goto('https://www.lambdatest.com/selenium-playground/upload-file-demo');
    await page.locator('#file').setInputFiles('testdata/June-2025.xlsx');
    await page.waitForSelector('#uploadSuccess', { timeout: 5000 });

    // Assertion: check if upload success message is visible
    const successVisible = await page.locator('#uploadSuccess').isVisible();
    check(successVisible, {
        'Upload success message is visible': (v) => v === true
    });

    await page.close();
}

// k6 run file-upload.js

