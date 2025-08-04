import { browser,networkProfiles } from 'k6/browser';

export const options = {
    scenarios: {
      ui: {
        executor: 'shared-iterations',  // Fixed: Use only iterations
        vus: 1,  // Number of virtual users
        iterations: 1,  // Fixed: Replace duration with iterations
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
    page.setViewportSize(
        { width: 430, height: 812 }  // Set viewport size for mobile testing
    );
    const networkProfile = networkProfiles['Fast 3G']; // Use Fast 3G profile
    await page.goto("https://rubinoshoes.com/", { waitUntil: 'networkidle' });

    // Close the browser after visiting the page
    await page.close();
}

