const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const screenshotsDir = './screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('Taking screenshots for all tasks...');

  try {
    // Task 3: About Us page
    console.log('Task 3: About Us page');
    await page.goto('http://localhost:8000/about/', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/about_us.png`, fullPage: false });

    // Task 4: Contact Us page
    console.log('Task 4: Contact Us page');
    await page.goto('http://localhost:8000/contact/', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/contact_us.png`, fullPage: false });

    // Task 5: Login page
    console.log('Task 5: Login page');
    await page.goto('http://localhost:8000/login/', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/login.png`, fullPage: false });

    // Task 7: Sign-up page
    console.log('Task 7: Sign-up page');
    await page.goto('http://localhost:8000/register/', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/sign-up.png`, fullPage: false });

    // Task 8: Dealer reviews via Express API
    console.log('Task 8: Dealer reviews (Express API)');
    await page.goto('http://localhost:3030/fetchReviews/dealer/29', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/dealer_review.png`, fullPage: false });

    // Task 9: All dealers via Express API
    console.log('Task 9: All dealerships (Express API)');
    await page.goto('http://localhost:3030/fetchDealers', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/dealerships.png`, fullPage: false });

    // Task 10: Dealer details via Express API
    console.log('Task 10: Dealer details (Express API)');
    await page.goto('http://localhost:3030/fetchDealer/3', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/dealer_details.png`, fullPage: false });

    // Task 11: Kansas dealers via Express API
    console.log('Task 11: Kansas dealers (Express API)');
    await page.goto('http://localhost:3030/fetchDealers/Kansas', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/kansasDealers.png`, fullPage: false });

    // Task 12: Admin login
    console.log('Task 12: Admin login');
    await page.goto('http://localhost:8000/admin/', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/admin_login.png`, fullPage: false });

    // Task 14: Car makes
    console.log('Task 14: Car makes');
    await page.goto('http://localhost:8000/djangoapp/get_cars', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/cars.png`, fullPage: false });

    // Task 17: Dealers page (not logged in)
    console.log('Task 17: Dealers page (not logged in)');
    await page.goto('http://localhost:8000/dealers/', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: `${screenshotsDir}/get_dealers.png`, fullPage: false });

    console.log('Basic screenshots completed! Manual screenshots needed for logged-in states.');

  } catch (error) {
    console.error('Error taking screenshots:', error);
  }

  await browser.close();
  console.log('Screenshot generation complete!');
})();
