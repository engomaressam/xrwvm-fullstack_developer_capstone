/*jshint esversion: 8 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('📸 Starting screenshot capture for all 27 required tasks...\n');

  const screenshots = [];

  async function captureScreenshot(name, url, description, waitTime = 2000) {
    try {
      console.log(`📷 Capturing: ${name}`);
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
      await page.waitForTimeout(waitTime);
      const screenshotPath = path.join(screenshotsDir, `${name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      screenshots.push({ name, description, status: '✅' });
      console.log(`   ✅ Saved: ${name}.png\n`);
    } catch (error) {
      screenshots.push({ name, description, status: '❌' });
      console.error(`   ❌ Error capturing ${name}: ${error.message}\n`);
    }
  }

  // Task 3: About Us
  await captureScreenshot(
    'about_us',
    'http://localhost:8000/about/',
    'About Us page showing team member profiles and company information'
  );

  // Task 4: Contact Us
  await captureScreenshot(
    'contact_us',
    'http://localhost:8000/contact/',
    'Contact Us page displaying dealership address and contact details'
  );

  // Task 5: Login (homepage after login - needs manual login)
  await captureScreenshot(
    'login',
    'http://localhost:8000/login/',
    'Login page with username/password fields for authentication'
  );

  // Task 7: Sign-up
  await captureScreenshot(
    'sign-up',
    'http://localhost:8000/register/',
    'Registration page with form fields for creating new user account'
  );

  // Task 8: Dealer reviews via Express API
  await captureScreenshot(
    'dealer_review',
    'http://localhost:3030/fetchReviews/dealer/29',
    'JSON response showing all reviews for dealer ID 29 from MongoDB'
  );

  // Task 9: All dealerships via Express API
  await captureScreenshot(
    'dealerships',
    'http://localhost:3030/fetchDealers',
    'JSON response listing all dealerships across all states from Express API'
  );

  // Task 10: Dealer details via Express API
  await captureScreenshot(
    'dealer_details',
    'http://localhost:3030/fetchDealer/3',
    'JSON response with detailed information for specific dealer ID 3'
  );

  // Task 11: Kansas dealers via Express API
  await captureScreenshot(
    'kansasDealers',
    'http://localhost:3030/fetchDealers/Kansas',
    'JSON response showing dealerships filtered by Kansas state'
  );

  // Task 12: Admin login
  await captureScreenshot(
    'admin_login',
    'http://localhost:8000/admin/',
    'Django admin login page for superuser access'
  );

  // Task 14: Car makes
  await captureScreenshot(
    'cars',
    'http://localhost:8000/djangoapp/get_cars',
    'JSON response displaying all car makes and models from Django API'
  );

  // Task 17: Dealers page (not logged in)
  await captureScreenshot(
    'get_dealers',
    'http://localhost:8000/dealers/',
    'Dealerships page showing table of all dealers without login'
  );

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SCREENSHOT CAPTURE SUMMARY');
  console.log('='.repeat(60) + '\n');
  
  screenshots.forEach((s, i) => {
    console.log(`${i + 1}. ${s.status} ${s.name}.png`);
    console.log(`   ${s.description}\n`);
  });

  const successCount = screenshots.filter(s => s.status === '✅').length;
  console.log(`\n✅ Successfully captured: ${successCount}/${screenshots.length} screenshots`);
  console.log('\n⚠️  MANUAL SCREENSHOTS STILL NEEDED:');
  console.log('   • logout.png - Logout alert after clicking logout');
  console.log('   • admin_logout.png - Admin logout confirmation');
  console.log('   • car_models.png - Car models in admin panel');
  console.log('   • sentiment_analyzer.png - Sentiment analyzer endpoint');
  console.log('   • get_dealers_loggedin.png - Dealers page after login');
  console.log('   • dealersbystate.png - Dealers filtered by state');
  console.log('   • dealer_id_reviews.png - Dealer details with reviews');
  console.log('   • dealership_review_submission.png - Review form filled');
  console.log('   • added_review.png - New review with sentiment');
  console.log('   • CICD.png - GitHub Actions workflow success');
  console.log('   • deployed_*.png - 4 deployment screenshots\n');

  await browser.close();
  console.log('✨ Screenshot capture complete!\n');
})();
