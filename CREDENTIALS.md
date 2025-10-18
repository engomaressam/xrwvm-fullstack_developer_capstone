# Best Cars Dealership - Project Credentials

## Django Admin Superuser
- **Username:** admin
- **Email:** admin@bestcars.com
- **Password:** admin123

## Access URLs
- **Homepage:** http://localhost:8000/
- **Admin Panel:** http://localhost:8000/admin/
- **About Us:** http://localhost:8000/about/
- **Contact Us:** http://localhost:8000/contact/
- **Login:** http://localhost:8000/login/
- **Register:** http://localhost:8000/register/

## API Endpoints
- **Login API:** http://localhost:8000/djangoapp/login
- **Logout API:** http://localhost:8000/djangoapp/logout
- **Register API:** http://localhost:8000/djangoapp/register

## Module Completion Status

### ✅ Module 1: Static Pages (Completed)
- Fork and clone GitHub repository
- Set up virtual environment
- Configure Django settings
- Create About Us page
- Create Contact Us page
- Add URL routing

### ✅ Module 2: User Management (Completed)
- Create Django superuser
- Build React frontend
- Configure Django for React
- Add Login view and functionality
- Add Logout view and functionality
- Add Registration view and component
- Test authentication flows

## Development Commands

### Start Development Server
```bash
cd server
.\djangoenv\Scripts\Activate.ps1
python manage.py runserver
```

### Build React Frontend
```bash
cd server/frontend
npm install
npm run build
```

### Run Migrations
```bash
cd server
.\djangoenv\Scripts\Activate.ps1
python manage.py makemigrations
python manage.py migrate
```

## Notes
- The superuser was created automatically using the create_superuser.py script
- All authentication is functional with session management
- React components are integrated with Django backend
