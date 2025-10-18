# Screenshots for Final Submission

This folder contains all 27 required screenshots for the IBM Full-Stack Developer Capstone Project.

## How to Generate These Screenshots

### Option 1: Automated (Puppeteer)
```bash
# From project root
npm install puppeteer
node create_screenshots.js
```

### Option 2: Manual
1. Start all services:
   - Django: `python manage.py runserver`
   - MongoDB/Express: `docker-compose up`
2. Open browser (1920x1080 recommended)
3. Navigate to each URL
4. Take screenshot with F12 tools or Snipping Tool
5. Save with exact filenames listed below

## Required Screenshots List

### Module 1 (3 screenshots)
1. `django_server.png` - Terminal showing Django server running
2. `about_us.png` - http://localhost:8000/about/
3. `contact_us.png` - http://localhost:8000/contact/

### Module 2 (3 screenshots)
4. `login.png` - http://localhost:8000/login (after logging in)
5. `logout.png` - Logout alert message
6. `sign-up.png` - http://localhost:8000/register/

### Module 3 - Express API (4 screenshots)
7. `dealer_review.png` - http://localhost:3030/fetchReviews/dealer/29
8. `dealerships.png` - http://localhost:3030/fetchDealers
9. `dealer_details.png` - http://localhost:3030/fetchDealer/3
10. `kansasDealers.png` - http://localhost:3030/fetchDealers/Kansas

### Module 3 - Django Models (4 screenshots)
11. `admin_login.png` - http://localhost:8000/admin/
12. `admin_logout.png` - Admin logout confirmation
13. `cars.png` - http://localhost:8000/djangoapp/get_cars
14. `car_models.png` - Admin page with car models list

### Module 3 - Sentiment Analyzer (1 screenshot)
15. `sentiment_analyzer.png` - http://localhost:5050/analyze/Excellent

### Module 4 (6 screenshots)
16. `get_dealers.png` - http://localhost:8000/dealers/ (not logged in)
17. `get_dealers_loggedin.png` - http://localhost:8000/dealers/ (logged in)
18. `dealersbystate.png` - http://localhost:8000/dealers/ (filtered by state)
19. `dealer_id_reviews.png` - http://localhost:8000/dealer/15
20. `dealership_review_submission.png` - http://localhost:8000/postreview/15 (form filled)
21. `added_review.png` - http://localhost:8000/dealer/15 (after review added)

### Module 5 - CI/CD (1 screenshot)
22. `CICD.png` - GitHub Actions success (from GitHub website)

### Module 5 - Deployment (4 screenshots)
23. `deployed_landingpage.png` - Deployed app landing page
24. `deployed_loggedin.png` - Deployed app logged in
25. `deployed_dealer_detail.png` - Deployed dealer details
26. `deployed_add_review.png` - Deployed review added

## Important Notes

1. **URL Must Be Visible:** Every screenshot must show the browser address bar
2. **Full Page:** Capture enough context to show functionality
3. **High Quality:** Use at least 1280x720 resolution
4. **Exact Filenames:** Use the exact filenames listed above
5. **PNG or JPG:** Either format is acceptable

## Screenshot Dimensions

Recommended: **1920x1080**
Minimum: **1280x720**

## Tools to Use

- **Windows:** Snipping Tool, Snip & Sketch, ShareX
- **Browser:** F12 DevTools screenshot feature
- **Automated:** Puppeteer script (create_screenshots.js)

## Verification Checklist

Before submission, verify:
- [ ] All 26 screenshots present
- [ ] Correct filenames (no typos)
- [ ] URLs visible in address bar
- [ ] Images are clear and readable
- [ ] No sensitive information visible
- [ ] File sizes reasonable (< 5MB each)

## Submission

Upload all screenshots along with:
1. GitHub URL: https://github.com/engomaressam/best.cars.dealership
2. Deployment URL (if applicable)

---

**Project:** Best Cars Dealership  
**Developer:** Omar Essam  
**GitHub:** https://github.com/engomaressam
