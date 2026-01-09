# Table d'Adrian - Luxury Private Chef Website

A stunning, modern website for Table d'Adrian - luxury private chef services. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Modern Design**: Dark theme with gold accents, elegant typography
- ✨ **Smooth Animations**: Framer Motion and GSAP for fluid interactions
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🍽️ **Recipe Database**: Browse and filter recipes with detailed instructions
- 🏥 **Health-Conscious Filtering**: Filter recipes by health conditions, allergies, and dietary goals
- 📝 **Blog/Articles**: Culinary insights and expertise from Chef Adrian
- 🧮 **BMI Calculator**: Interactive health calculator with animated gauge and AI body scan
- 💰 **Pricing Page**: Marketing-optimized pricing with psychology tactics
- 📧 **Contact Form**: Validated booking form with React Hook Form
- 🎯 **SEO Optimized**: Meta tags, structured data, and semantic HTML
- ✅ **CI/CD Ready**: GitHub Actions workflow configured
- 🧪 **Tested**: Jest and React Testing Library setup

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP, Lenis
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **3D**: React Three Fiber (optional)
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
ta_website/
├── app/              # Next.js app router pages
│   ├── page.tsx      # Home page
│   ├── bmi/          # BMI calculator
│   ├── recipes/      # Recipe pages
│   ├── articles/     # Blog/articles
│   ├── pricing/      # Pricing page
│   └── contact/      # Contact/booking
├── components/       # React components
│   ├── layout/       # Navbar, Footer, etc.
│   ├── sections/     # Home page sections
│   ├── bmi/          # BMI calculator components
│   ├── recipes/      # Recipe components
│   ├── articles/     # Article components
│   ├── pricing/      # Pricing components
│   └── contact/      # Contact form
├── data/             # Sample data (recipes, articles, pricing, health conditions)
├── lib/              # Utilities and helpers
├── __tests__/        # Test files
└── .github/          # CI/CD workflows
```

## Key Features

### Health-Conscious Recipe Filtering
- Filter by health conditions (diabetes, heart disease, digestive issues, etc.)
- Filter by allergies (dairy, nuts, gluten, etc.)
- Filter by lifestyle diets (vegan, keto, paleo, etc.)
- Filter by health goals (weight loss, muscle gain, anti-aging)

### Marketing-Optimized Pricing
- Social proof statistics
- Decoy effect with "Most Popular" badge
- Urgency messaging
- Money-back guarantees
- FAQ for objection handling

### AI Body Analysis
- Manual BMI calculation
- AI camera body scan (placeholder for integration)
- Animated gauge visualization
- Personalized health recommendations

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Runs on push/PR to main/master/develop branches
- Tests on Node.js 18.x and 20.x
- Runs linter and type checking
- Builds the project
- Runs tests
- Deploys to Vercel (if configured)

## Deployment

The site is ready to deploy on Vercel, Netlify, or any platform supporting Next.js.

```bash
# Build
npm run build

# Deploy to Vercel
vercel
```

## Customization

### Colors

Edit `app/globals.css` to customize the color palette:

```css
:root {
  --primary: 43 100% 50%;  /* Gold */
  --background: 0 0% 4%;    /* Dark background */
  /* ... */
}
```

### Content

- Recipes: Edit `data/recipes.ts`
- Articles: Edit `data/articles.ts`
- Pricing: Edit `data/pricing.ts`
- Health Conditions: Edit `data/health-conditions.ts`
- Services: Edit `lib/constants.ts`

## License

Private - Table d'Adrian
