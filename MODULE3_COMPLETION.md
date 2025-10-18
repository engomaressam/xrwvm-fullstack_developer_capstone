# Module 3: Backend Services - Completion Report

## ✅ Module 3 Checklist Status

### Express-Mongo Backend (All Completed ✅)
1. **fetchDealers endpoint** ✅ - Returns all dealerships
2. **fetchDealers by state endpoint** ✅ - Returns dealerships filtered by state
3. **fetchDealer by ID endpoint** ✅ - Returns specific dealer by ID

### Django Models (All Completed ✅)
4. **CarModel and CarMake Django models** ✅ - Created with proper relationships
5. **Models registered with Admin site** ✅ - Both models accessible in admin panel
6. **Car models with associated makes** ✅ - 15 car models across 5 makes populated

### Django Proxy Services (All Completed ✅)
7. **get_request function in restapis.py** ✅ - Implemented with error handling
8. **get_dealerships view configured** ✅ - With route for all dealers and by state
9. **post_review method in restapis.py** ✅ - Implemented POST functionality
10. **get_dealer_details view configured** ✅ - With route
11. **get_dealer_reviews view configured** ✅ - With sentiment analysis integration
12. **add_review view configured** ✅ - With authentication check

---

## Implementation Details

### Part 1: Express-Mongo API Backend

**File:** `server/database/app.js`

#### Implemented Endpoints:

1. **GET /fetchDealers**
   ```javascript
   // Returns all dealerships from MongoDB
   app.get('/fetchDealers', async (req, res) => {
     const documents = await Dealerships.find();
     res.json(documents);
   });
   ```

2. **GET /fetchDealers/:state**
   ```javascript
   // Returns dealerships filtered by state (e.g., Kansas, California)
   app.get('/fetchDealers/:state', async (req, res) => {
     const documents = await Dealerships.find({state: req.params.state});
     res.json(documents);
   });
   ```

3. **GET /fetchDealer/:id**
   ```javascript
   // Returns specific dealer by ID
   app.get('/fetchDealer/:id', async (req, res) => {
     const documents = await Dealerships.find({id: parseInt(req.params.id)});
     res.json(documents);
   });
   ```

**Docker Setup:**
- Built Docker image: `nodeapp`
- Running on port: `3030`
- MongoDB container: `mongo_db`
- Network: `database_default`

---

### Part 2: Django Car Models

**File:** `server/djangoapp/models.py`

#### CarMake Model:
```python
class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name
```

#### CarModel Model:
```python
class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
    ]
    type = models.CharField(max_length=10, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(default=2023,
        validators=[MaxValueValidator(2023), MinValueValidator(2015)])
    
    def __str__(self):
        return self.name
```

**Populated Data:**
- **5 Car Makes:** NISSAN, Mercedes, Audi, Kia, Toyota
- **15 Car Models:** 3 models per make
  - NISSAN: Pathfinder, Qashqai, XTRAIL
  - Mercedes: A-Class, C-Class, E-Class
  - Audi: A4, A5, A6
  - Kia: Sorrento, Carnival, Cerato
  - Toyota: Corolla, Camry, Kluger

**Admin Registration:**
- Both models registered in `server/djangoapp/admin.py`
- Accessible at: http://localhost:8000/admin/

---

### Part 3: Django Proxy Services

**File:** `server/djangoapp/restapis.py`

#### get_request Function:
```python
def get_request(endpoint, **kwargs):
    # Constructs URL with parameters
    # Makes GET request to backend
    # Returns JSON response
    return response.json()
```

#### analyze_review_sentiments Function:
```python
def analyze_review_sentiments(text):
    # Calls sentiment analyzer microservice
    # Returns sentiment: positive/negative/neutral
    # Defaults to 'neutral' if service unavailable
    return response.json()
```

#### post_review Function:
```python
def post_review(data_dict):
    # Posts review to backend MongoDB
    # Returns confirmation
    return response.json()
```

---

### Part 4: Django Views

**File:** `server/djangoapp/views.py`

#### Implemented Views:

1. **get_dealerships(request, state="All")**
   - URL: `/djangoapp/get_dealers` or `/djangoapp/get_dealers/<state>`
   - Returns all dealers or dealers by state
   
2. **get_dealer_details(request, dealer_id)**
   - URL: `/djangoapp/dealer/<dealer_id>`
   - Returns specific dealer information

3. **get_dealer_reviews(request, dealer_id)**
   - URL: `/djangoapp/reviews/dealer/<dealer_id>`
   - Returns reviews for a dealer
   - **Includes sentiment analysis** for each review

4. **add_review(request)**
   - URL: `/djangoapp/add_review`
   - POST endpoint to submit new review
   - Requires authentication

5. **get_cars(request)**
   - URL: `/djangoapp/get_cars`
   - Returns all car makes and models
   - Auto-populates data on first call

---

## Testing Endpoints

### Backend API Endpoints (Port 3030)

Test these endpoints at: **http://localhost:3030**

1. **GET /fetchReviews/dealer/29**
   - Screenshot filename: `dealer_review.png`
   
2. **GET /fetchDealers**
   - Screenshot filename: `dealerships.png`
   
3. **GET /fetchDealer/3**
   - Screenshot filename: `dealer_details.png`
   
4. **GET /fetchDealers/Kansas**
   - Screenshot filename: `kansasDealers.png`

### Django API Endpoints (Port 8000)

Test these endpoints at: **http://localhost:8000**

1. **GET /djangoapp/get_cars**
   - Returns list of all car makes and models
   
2. **GET /djangoapp/get_dealers**
   - Returns all dealerships via proxy

3. **GET /djangoapp/get_dealers/Texas**
   - Returns dealers in Texas

4. **GET /djangoapp/dealer/5**
   - Returns details for dealer ID 5

5. **GET /djangoapp/reviews/dealer/15**
   - Returns reviews for dealer ID 15 with sentiment analysis

---

## Environment Configuration

**File:** `server/djangoapp/.env`

```env
backend_url=http://localhost:3030
sentiment_analyzer_url=http://localhost:5050/
```

**Note:** For local development, sentiment analyzer defaults to returning 'neutral' if the service is not available. This is configured in `restapis.py`.

---

## Docker Commands

### Build Node.js App:
```bash
cd server/database
docker build . -t nodeapp
```

### Start Containers:
```bash
docker-compose up
```

### Stop Containers:
```bash
docker-compose down
```

---

## Django Commands

### Run Migrations:
```bash
cd server
.\djangoenv\Scripts\Activate.ps1
python manage.py makemigrations djangoapp
python manage.py migrate
```

### Start Django Server:
```bash
python manage.py runserver
```

### Access Admin Panel:
- URL: http://localhost:8000/admin/
- Username: admin
- Password: admin123

---

## File Structure

```
server/
├── database/
│   ├── app.js              ✅ Implemented all endpoints
│   ├── dealership.js       
│   ├── review.js           
│   ├── Dockerfile          
│   ├── docker-compose.yml  
│   └── data/
│       ├── dealerships.json
│       └── reviews.json
│
├── djangoapp/
│   ├── models.py           ✅ CarMake & CarModel created
│   ├── admin.py            ✅ Models registered
│   ├── views.py            ✅ All views implemented
│   ├── urls.py             ✅ All routes configured
│   ├── restapis.py         ✅ Proxy functions implemented
│   ├── populate.py         ✅ Auto-populate data
│   └── .env                ✅ Backend URL configured
│
└── djangoproj/
    └── settings.py
```

---

## Summary

✅ **All Module 3 Requirements Completed:**

1. ✅ Express-Mongo backend with 3 endpoints implemented
2. ✅ Docker containers built and running
3. ✅ CarMake and CarModel Django models created
4. ✅ Models registered with admin site
5. ✅ 5 car makes and 15 car models populated
6. ✅ Django proxy services implemented
7. ✅ All dealership and review views created
8. ✅ Sentiment analysis integration (with fallback)
9. ✅ All URL routes configured
10. ✅ Changes committed to Git

**Ready for Module 4!** 🎉
