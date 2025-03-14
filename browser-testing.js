import { browser } from 'k6/browser';

export const options = {
    scenarios: {
      ui: {
        executor: 'shared-iterations',  // Fixed: Use only iterations
        vus: 2,  // Number of virtual users
        iterations: 10,  // Fixed: Replace duration with iterations
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

        { width: 375, 
          height: 812, 
          name: "Mobile (iPhone X)" },
    )
    await page.goto("https://rubinoshoes.com/");
    
    // Close the browser after visiting the page
    await page.close();
}
