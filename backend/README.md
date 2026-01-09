# Table d'Adrian Backend API

Secure, scalable backend for the Table d'Adrian luxury private chef booking platform.

## Features

- Express.js REST API
- Supabase PostgreSQL database
- Stripe payment integration
- JWT authentication
- Email automation (SendGrid/Nodemailer)
- AI body analysis (OpenAI)
- Health-conscious recipe filtering
- Booking management
- Rate limiting and security

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npm run migrate
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/webhook` - Stripe webhook handler
- `POST /api/payments/refund` - Process refund

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:slug` - Get recipe by slug
- `GET /api/recipes/filter/health` - Filter recipes by health conditions

### BMI
- `POST /api/bmi/calculate` - Calculate BMI
- `GET /api/bmi/history` - Get BMI calculation history

### AI
- `POST /api/ai/analyze-body` - AI body composition analysis
- `POST /api/ai/recipe-suggestions` - Get AI recipe suggestions

## Environment Variables

See `.env.example` for all required environment variables.

## Security

- Helmet.js for security headers
- Rate limiting on all endpoints
- CSRF protection
- JWT authentication
- Password validation (12+ chars, mixed case, numbers, special chars)
- Input sanitization

## Database

Uses Supabase PostgreSQL with Row Level Security (RLS) enabled.

## License

Private - Table d'Adrian
