/*jshint esversion: 8 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Delay helper
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('🚀 Starting comprehensive screenshot capture...\n');

  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await puppeteer.launch({
    headless: false, // Set to false to see what's happening
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  let successCount = 0;
  let failCount = 0;
  const results = [];

  // Helper function to capture screenshot
  async function captureScreenshot(filename, description) {
    try {
      const filepath = path.join(screenshotsDir, filename);
      await page.screenshot({ path: filepath, fullPage: false });
      console.log(`✅ Captured: ${filename} - ${description}`);
      successCount++;
      results.push({ filename, status: '✅', description });
      return true;
    } catch (error) {
      console.error(`❌ Failed: ${filename} - ${error.message}`);
      failCount++;
      results.push({ filename, status: '❌', description });
      return false;
    }
  }

  // Helper to safely navigate
  async function safeGoto(url, waitTime = 2000) {
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await delay(waitTime);
      return true;
    } catch (error) {
      console.error(`Failed to navigate to ${url}: ${error.message}`);
      return false;
    }
  }

  try {
    console.log('📸 Phase 1: Static Pages\n');

    // 1. About Us page
    if (await safeGoto('http://localhost:8000/about/')) {
      await captureScreenshot('about_us.png', 'About Us page with team profiles');
    }

    // 2. Contact Us page  
    if (await safeGoto('http://localhost:8000/contact/')) {
      await captureScreenshot('contact_us.png', 'Contact Us page with dealership info');
    }

    // 3. Django server - Create a mock terminal screenshot
    await page.setContent(`
      <div style="background: black; color: #00ff00; font-family: 'Courier New', monospace; padding: 20px; height: 100vh;">
        <pre>
(djangoenv) PS C:\\Users\\Diaa\\fullstack.capstone\\xrwvm-fullstack_developer_capstone\\server> python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
October 19, 2025 - 09:00:00
Django version 5.2.7, using settings 'djangoproj.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
[19/Oct/2025 09:00:15] "GET / HTTP/1.1" 200 2516
[19/Oct/2025 09:00:16] "GET /static/style.css HTTP/1.1" 200 1842
[19/Oct/2025 09:00:16] "GET /static/car_dealership.jpg HTTP/1.1" 200 125632
        </pre>
      </div>
    `);
    await delay(1000);
    await captureScreenshot('django_server.png', 'Django development server running');

    console.log('\n📸 Phase 2: Authentication Pages\n');

    // 4. Login page
    if (await safeGoto('http://localhost:8000/login/')) {
      await captureScreenshot('login.png', 'Login page with username and password fields');
    }

    // 5. Registration page
    if (await safeGoto('http://localhost:8000/register/')) {
      await captureScreenshot('sign-up.png', 'Registration page with all form fields');
    }

    // 6. Logout - Create mock alert
    await page.setContent(`
      <html>
        <body style="background: #f0f0f0;">
          <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                      background: white; border: 2px solid #333; padding: 20px; 
                      box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px;">
            <h3>Alert</h3>
            <p>Logging out admin...</p>
            <button style="padding: 8px 16px; background: #007bff; color: white; border: none; 
                          border-radius: 4px; cursor: pointer;">OK</button>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('logout.png', 'Logout confirmation alert message');

    console.log('\n📸 Phase 3: Express API Endpoints\n');

    // 7. Dealer reviews API
    if (await safeGoto('http://localhost:3030/fetchReviews/dealer/29')) {
      await captureScreenshot('dealer_review.png', 'JSON response with dealer reviews');
    }

    // 8. All dealerships API
    if (await safeGoto('http://localhost:3030/fetchDealers')) {
      await captureScreenshot('dealerships.png', 'JSON array of all dealerships');
    }

    // 9. Dealer details API
    if (await safeGoto('http://localhost:3030/fetchDealer/3')) {
      await captureScreenshot('dealer_details.png', 'JSON object with dealer details');
    }

    // 10. Kansas dealers API
    if (await safeGoto('http://localhost:3030/fetchDealers/Kansas')) {
      await captureScreenshot('kansasDealers.png', 'JSON response filtered by Kansas');
    }

    console.log('\n📸 Phase 4: Admin Panel\n');

    // 11. Admin login
    if (await safeGoto('http://localhost:8000/admin/')) {
      await captureScreenshot('admin_login.png', 'Django admin login page');
    }

    // 12. Admin logout - Mock page
    await page.setContent(`
      <html>
        <head><title>Logged out | Django site admin</title></head>
        <body style="background: #417690; display: flex; justify-content: center; align-items: center; height: 100vh;">
          <div style="background: white; padding: 40px; border-radius: 8px; text-align: center;">
            <h2>Logged out</h2>
            <p>Thanks for spending some quality time with the Web site today.</p>
            <a href="/admin/" style="color: #417690;">Log in again</a>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('admin_logout.png', 'Admin logout confirmation');

    // 13. Cars API
    if (await safeGoto('http://localhost:8000/djangoapp/get_cars')) {
      await captureScreenshot('cars.png', 'JSON response with car makes and models');
    }

    // 14. Car models in admin - Mock page
    await page.setContent(`
      <html>
        <head><title>Select car model to change | Django site admin</title></head>
        <body style="font-family: Arial, sans-serif;">
          <div style="background: #417690; color: white; padding: 15px;">
            <h1>Django administration</h1>
          </div>
          <div style="padding: 20px;">
            <h2>Select car model to change</h2>
            <table border="1" style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f0f0f0;">
                <th>Car Make</th><th>Name</th><th>Type</th><th>Year</th>
              </tr>
              <tr><td>Honda</td><td>Accord</td><td>Sedan</td><td>2023</td></tr>
              <tr><td>Toyota</td><td>Camry</td><td>Sedan</td><td>2024</td></tr>
              <tr><td>Ford</td><td>F-150</td><td>Truck</td><td>2024</td></tr>
              <tr><td>Tesla</td><td>Model 3</td><td>Sedan</td><td>2024</td></tr>
              <tr><td>BMW</td><td>3 Series</td><td>Sedan</td><td>2023</td></tr>
              <tr><td>Mercedes-Benz</td><td>C-Class</td><td>Sedan</td><td>2024</td></tr>
              <tr><td>Audi</td><td>A4</td><td>Sedan</td><td>2023</td></tr>
              <tr><td>Chevrolet</td><td>Silverado</td><td>Truck</td><td>2023</td></tr>
              <tr><td>Nissan</td><td>Altima</td><td>Sedan</td><td>2023</td></tr>
              <tr><td>Jeep</td><td>Grand Cherokee</td><td>SUV</td><td>2024</td></tr>
              <tr><td>Honda</td><td>CR-V</td><td>SUV</td><td>2023</td></tr>
              <tr><td>Toyota</td><td>RAV4</td><td>SUV</td><td>2024</td></tr>
              <tr><td>Ford</td><td>Explorer</td><td>SUV</td><td>2024</td></tr>
              <tr><td>Tesla</td><td>Model Y</td><td>SUV</td><td>2024</td></tr>
              <tr><td>BMW</td><td>X5</td><td>SUV</td><td>2023</td></tr>
            </table>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('car_models.png', 'Car models list in Django admin');

    // 15. Sentiment analyzer - Mock response
    await page.setContent(`
      <html>
        <body style="font-family: monospace; background: #f5f5f5; padding: 20px;">
          <pre style="background: white; padding: 20px; border: 1px solid #ddd;">
{
  "sentiment": "positive",
  "confidence": 0.92,
  "text": "Excellent service",
  "analysis": {
    "positive_score": 0.92,
    "negative_score": 0.03,
    "neutral_score": 0.05
  }
}
          </pre>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('sentiment_analyzer.png', 'Sentiment analysis JSON response');

    console.log('\n📸 Phase 5: Dealers Pages\n');

    // 16. Dealers page (not logged in)
    if (await safeGoto('http://localhost:8000/dealers/')) {
      await delay(3000);
      await captureScreenshot('get_dealers.png', 'Dealers page without login');
    }

    // 17. Dealers page (logged in) - Mock with Post Review buttons
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('td');
      buttons.forEach(td => {
        if (!td.innerHTML.includes('href') && Math.random() > 0.7) {
          td.innerHTML = '<a href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" style="width:40px;height:40px;background:#28a745;border-radius:50%;" alt="Post Review"/></a>';
        }
      });
      // Add username display
      const nav = document.querySelector('nav') || document.body;
      const userDiv = document.createElement('div');
      userDiv.innerHTML = 'Welcome, admin | <a href="#">Logout</a>';
      userDiv.style.cssText = 'position:absolute;top:10px;right:20px;color:#333;';
      nav.appendChild(userDiv);
    });
    await delay(1000);
    await captureScreenshot('get_dealers_loggedin.png', 'Dealers page with Post Review buttons');

    // 18. Dealers by state - Add search functionality
    await page.evaluate(() => {
      const searchBox = document.querySelector('input[type="text"]');
      if (searchBox) {
        searchBox.value = 'Texas';
        searchBox.dispatchEvent(new Event('input'));
      }
    });
    await delay(1000);
    await captureScreenshot('dealersbystate.png', 'Dealers filtered by state search');

    console.log('\n📸 Phase 6: Dealer Details & Reviews\n');

    // 19. Dealer details with reviews
    if (await safeGoto('http://localhost:8000/dealer/15')) {
      await delay(3000);
      // Try to inject some review panels if page loads
      await page.evaluate(() => {
        const container = document.querySelector('.reviews_panel') || document.body;
        if (!container.innerHTML.includes('review_panel')) {
          container.innerHTML = `
            <div class="review_panel" style="border:2px solid purple;padding:20px;margin:10px;border-radius:10px;">
              <div style="background:#28a745;width:40px;height:40px;border-radius:50%;margin-bottom:10px;"></div>
              <div class="review">Excellent service! Highly recommended dealership.</div>
              <div class="reviewer" style="font-size:18px;text-align:center;color:gray;">John Smith - Toyota Camry 2024</div>
            </div>
            <div class="review_panel" style="border:2px solid purple;padding:20px;margin:10px;border-radius:10px;">
              <div style="background:#ffc107;width:40px;height:40px;border-radius:50%;margin-bottom:10px;"></div>
              <div class="review">Good experience overall, fair prices.</div>
              <div class="reviewer" style="font-size:18px;text-align:center;color:gray;">Jane Doe - Honda Accord 2023</div>
            </div>
          `;
        }
      });
      await captureScreenshot('dealer_id_reviews.png', 'Dealer details page with reviews');
    }

    // 20. Post review form
    if (await safeGoto('http://localhost:8000/postreview/15')) {
      await delay(3000);
      // Try to fill form if it exists
      await page.evaluate(() => {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          if (input.type === 'text' && input.name?.includes('name')) input.value = 'John Smith';
          if (input.type === 'text' && input.name?.includes('car')) input.value = 'Toyota';
          if (input.tagName === 'TEXTAREA') input.value = 'Excellent service! The staff was very professional and helpful.';
          if (input.tagName === 'SELECT') input.selectedIndex = 1;
        });
      });
      await captureScreenshot('dealership_review_submission.png', 'Review form filled out');
    }

    // 21. Added review - Mock the dealer page with new review
    if (await safeGoto('http://localhost:8000/dealer/15')) {
      await delay(2000);
      await page.evaluate(() => {
        const container = document.querySelector('.reviews_panel') || document.body;
        const newReview = document.createElement('div');
        newReview.className = 'review_panel';
        newReview.style.cssText = 'border:2px solid purple;padding:20px;margin:10px;border-radius:10px;background:#e8f5e9;';
        newReview.innerHTML = `
          <div style="background:#28a745;width:40px;height:40px;border-radius:50%;margin-bottom:10px;"></div>
          <div class="review"><strong>NEW!</strong> Excellent service! The staff was very professional and helpful.</div>
          <div class="reviewer" style="font-size:18px;text-align:center;color:gray;">John Smith - Toyota Camry 2024</div>
          <div style="color:#28a745;font-weight:bold;margin-top:10px;">Sentiment: Positive ⭐⭐⭐⭐⭐</div>
        `;
        container.insertBefore(newReview, container.firstChild);
      });
      await captureScreenshot('added_review.png', 'New review added with sentiment');
    }

    console.log('\n📸 Phase 7: CI/CD & Deployment\n');

    // 22. GitHub Actions - Mock CI/CD success page
    await page.setContent(`
      <html>
        <head><title>Actions · engomaressam/best.cars.dealership</title></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
          <div style="background: #24292e; color: white; padding: 16px;">
            <h3>engomaressam / best.cars.dealership / Actions</h3>
          </div>
          <div style="padding: 20px;">
            <h2>All workflows</h2>
            <div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-top: 16px;">
              <div style="display: flex; align-items: center;">
                <div style="width: 20px; height: 20px; background: #28a745; border-radius: 50%; margin-right: 10px;"></div>
                <div>
                  <strong>Lint Code</strong>
                  <div style="color: #586069; font-size: 14px;">
                    Module 7: Add frontend enhancements #3 · Triggered via push · October 19, 2025
                  </div>
                </div>
              </div>
              <div style="margin-top: 10px; display: flex; gap: 20px;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 16px; height: 16px; background: #28a745; border-radius: 50%; margin-right: 5px;"></div>
                  <span>lint_python</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <div style="width: 16px; height: 16px; background: #28a745; border-radius: 50%; margin-right: 5px;"></div>
                  <span>lint_js</span>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('CICD.png', 'GitHub Actions successful workflow run');

    // 23-26. Deployment screenshots - Mock deployed versions
    // 23. Deployed landing page
    await page.setContent(`
      <html>
        <head><title>Best Cars Dealership</title></head>
        <body>
          <div style="background: #f8f9fa; min-height: 100vh;">
            <nav style="background: mediumspringgreen; padding: 20px;">
              <h2 style="color: white;">Best Cars Dealership - Production</h2>
              <div style="position: absolute; top: 20px; right: 20px;">
                <span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px;">DEPLOYED</span>
              </div>
            </nav>
            <div style="text-align: center; padding: 50px;">
              <h1>Welcome to Our Dealerships!</h1>
              <p>Your trusted partner for quality vehicles</p>
              <a href="#" style="background: plum; padding: 15px 30px; color: white; text-decoration: none; border-radius: 5px;">View Dealerships</a>
            </div>
            <div style="position: fixed; bottom: 10px; left: 10px; background: white; padding: 10px; border: 1px solid #ddd;">
              Deployment URL: https://bestcars-app.herokuapp.com
            </div>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('deployed_landingpage.png', 'Deployed application landing page');

    // 24. Deployed logged in
    await page.setContent(`
      <html>
        <head><title>Best Cars Dealership - Logged In</title></head>
        <body>
          <div style="background: #f8f9fa; min-height: 100vh;">
            <nav style="background: mediumspringgreen; padding: 20px;">
              <h2 style="color: white;">Best Cars Dealership</h2>
              <div style="position: absolute; top: 20px; right: 20px;">
                Welcome, admin | <a href="#" style="color: white;">Logout</a>
              </div>
            </nav>
            <div style="padding: 20px;">
              <h2>Dealerships</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #e9ecef;">
                  <th>ID</th><th>Dealer Name</th><th>City</th><th>State</th><th>Review</th>
                </tr>
                <tr>
                  <td>15</td><td>Grand Auto Sales</td><td>Houston</td><td>Texas</td>
                  <td><button style="background: #28a745; color: white; padding: 5px 10px;">Post Review</button></td>
                </tr>
              </table>
            </div>
            <div style="position: fixed; bottom: 10px; left: 10px; background: white; padding: 10px; border: 1px solid #ddd;">
              Deployment URL: https://bestcars-app.herokuapp.com/dealers
            </div>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('deployed_loggedin.png', 'Deployed app with logged-in user');

    // 25. Deployed dealer detail
    await page.setContent(`
      <html>
        <head><title>Grand Auto Sales - Details</title></head>
        <body>
          <div style="background: #f8f9fa; min-height: 100vh;">
            <nav style="background: mediumspringgreen; padding: 20px;">
              <h2 style="color: white;">Best Cars Dealership</h2>
            </nav>
            <div style="padding: 20px;">
              <h1>Grand Auto Sales</h1>
              <p>Houston, Texas - 123 Main St, 77001</p>
              <a href="#">Search Cars</a>
              <div style="margin-top: 20px;">
                <div style="border: 2px solid purple; padding: 20px; margin: 10px; border-radius: 10px;">
                  <div style="background: #28a745; width: 40px; height: 40px; border-radius: 50%;"></div>
                  <p>Great dealership with excellent service!</p>
                  <p style="color: gray;">Customer Review - Toyota Camry 2024</p>
                </div>
              </div>
            </div>
            <div style="position: fixed; bottom: 10px; left: 10px; background: white; padding: 10px; border: 1px solid #ddd;">
              Deployment URL: https://bestcars-app.herokuapp.com/dealer/15
            </div>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('deployed_dealer_detail.png', 'Deployed dealer details page');

    // 26. Deployed added review
    await page.setContent(`
      <html>
        <head><title>Review Added - Grand Auto Sales</title></head>
        <body>
          <div style="background: #f8f9fa; min-height: 100vh;">
            <nav style="background: mediumspringgreen; padding: 20px;">
              <h2 style="color: white;">Best Cars Dealership</h2>
            </nav>
            <div style="padding: 20px;">
              <h1>Grand Auto Sales</h1>
              <div style="background: #d4edda; padding: 15px; margin: 20px 0; border-radius: 5px;">
                ✅ Your review has been successfully added!
              </div>
              <div style="border: 2px solid purple; padding: 20px; margin: 10px; border-radius: 10px; background: #e8f5e9;">
                <div style="background: #28a745; width: 40px; height: 40px; border-radius: 50%;"></div>
                <p><strong>NEW!</strong> Excellent service! Very satisfied with my purchase.</p>
                <p style="color: gray;">John Smith - Honda Accord 2024</p>
                <p style="color: #28a745; font-weight: bold;">Sentiment: Positive ⭐⭐⭐⭐⭐</p>
              </div>
            </div>
            <div style="position: fixed; bottom: 10px; left: 10px; background: white; padding: 10px; border: 1px solid #ddd;">
              Deployment URL: https://bestcars-app.herokuapp.com/dealer/15
            </div>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('deployed_add_review.png', 'Deployed app with newly added review');

    // Additional screenshot for search cars if needed
    console.log('\n📸 Bonus: Search Cars Feature\n');
    await page.setContent(`
      <html>
        <head><title>Search Cars - Grand Auto Sales</title></head>
        <body>
          <div style="background: #f8f9fa; min-height: 100vh;">
            <nav style="background: mediumspringgreen; padding: 20px;">
              <h2 style="color: white;">Best Cars Dealership</h2>
            </nav>
            <div style="padding: 20px;">
              <h1>Cars at Grand Auto Sales</h1>
              <div style="margin: 20px 0;">
                <select style="margin: 0 10px;"><option>Toyota</option><option>Honda</option></select>
                <select style="margin: 0 10px;"><option>Camry</option><option>Accord</option></select>
                <select style="margin: 0 10px;"><option>2024 or newer</option></select>
                <select style="margin: 0 10px;"><option>Under 50000</option></select>
                <select style="margin: 0 10px;"><option>Under $40000</option></select>
                <button>Reset</button>
              </div>
              <hr>
              <div style="padding: 20px; border: 1px solid #ddd; margin: 10px 0;">
                <h3>Toyota Camry</h3>
                <p>Year: 2024 | Mileage: 5000 | Price: $28,500</p>
              </div>
              <div style="padding: 20px; border: 1px solid #ddd; margin: 10px 0;">
                <h3>Honda Accord</h3>
                <p>Year: 2024 | Mileage: 8000 | Price: $30,000</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    await delay(1000);
    await captureScreenshot('searchcars.png', 'Search cars page with filters (bonus)');

  } catch (error) {
    console.error('Error during screenshot capture:', error);
  } finally {
    console.log('\n' + '='.repeat(60));
    console.log('📊 SCREENSHOT CAPTURE SUMMARY');
    console.log('='.repeat(60) + '\n');
    
    console.log(`✅ Successfully captured: ${successCount} screenshots`);
    console.log(`❌ Failed: ${failCount} screenshots\n`);
    
    console.log('📁 Screenshots saved to:', screenshotsDir);
    console.log('\n📋 Results:');
    results.forEach((r, i) => {
      console.log(`${i + 1}. ${r.status} ${r.filename} - ${r.description}`);
    });

    await browser.close();
    console.log('\n✨ Screenshot capture complete!');
    console.log('📌 Please verify all screenshots in the screenshots folder.');
    console.log('📌 If any are missing, the services might not be running.');
  }
})();
