# Shoppit - E-commerce Platform

A full-stack e-commerce application built with Django REST API and React frontend.

## Project Structure

```
Shoppit/
├── backend/          # Django REST API
├── frontend/         # React frontend
└── requirements.txt  # Python dependencies
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL database
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Shoppit
   ```

2. **Set up Python virtual environment**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up MySQL database**
   - Create a MySQL database named `ecommerce_db`
   - Update database credentials in `backend/backend/settings.py` if needed

5. **Run Django migrations**
   ```bash
   cd backend
   python manage.py migrate
   ```

6. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django development server**
   ```bash
   python manage.py runserver 3000
   ```
   The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Install Node.js dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the React development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Media Files Setup

**Important**: The `media/` directory contains uploaded images and is not included in the Git repository. You need to:

1. **Create the media directory structure**
   ```bash
   cd backend
   mkdir -p media/img media/profile_pictures
   ```

2. **Add sample images** (optional)
   - Place product images in `backend/media/img/`
   - Place profile pictures in `backend/media/profile_pictures/`

3. **Or create products through the admin interface**
   - Go to `http://localhost:3000/admin/`
   - Login with your superuser credentials
   - Add products with images through the admin interface

### Environment Variables

Create a `.env` file in the backend directory:

```env
PAYSTACK_SECRET_KEY=your_paystack_secret_key
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

- **Products**: `GET/POST /api/products/`
- **Product Detail**: `GET /api/products/<slug>/`
- **Authentication**: `POST /api/token/`
- **User Registration**: `POST /api/register/`
- **Cart**: `GET/POST /api/cart/`
- **Orders**: `GET/POST /api/orders/`

## Troubleshooting

### Images Not Showing

If images are not displaying after cloning:

1. **Check if media directory exists**
   ```bash
   ls backend/media/
   ```

2. **Ensure Django is serving media files**
   - Verify `MEDIA_URL` and `MEDIA_ROOT` are set in `settings.py`
   - Check that media URLs are configured in `urls.py`

3. **Check frontend configuration**
   - Ensure `BASE_URL` in `frontend/src/api/axios.js` points to the correct backend URL
   - Verify image URLs are using the correct backend URL

4. **Add sample images**
   - Create products through the admin interface with images
   - Or manually add images to the media directories

### Database Issues

1. **Reset database**
   ```bash
   cd backend
   python manage.py flush
   python manage.py migrate
   ```

2. **Create fresh superuser**
   ```bash
   python manage.py createsuperuser
   ```

## Development

- Backend API: `http://localhost:3000`
- Frontend: `http://localhost:5173`
- Admin Interface: `http://localhost:3000/admin/`

## Production Deployment

For production deployment:

1. Set `DEBUG = False` in `settings.py`
2. Configure proper database settings
3. Set up static file serving
4. Configure environment variables
5. Use a production WSGI server like Gunicorn 