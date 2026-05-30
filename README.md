VirtuFit - Virtual Try-On Application
A production-ready virtual try-on experience built with React, featuring AI-powered garment visualization, smooth animations, and a premium luxury fashion aesthetic.

VirtuFit
React
Vite

Features
🎯 AI-Powered Virtual Try-On
🔐 Google OAuth Authentication
📸 Photo Upload with Drag & Drop
📊 Admin Analytics Dashboard
✨ Premium Animations & Transitions
🌙 Dark Luxury Fashion Aesthetic
📱 Fully Responsive Design

Tech Stack
Frontend: React + Vite
Styling: Tailwind CSS
Routing: React Router
Authentication: Firebase (Google OAuth)
Animations: Framer Motion + GSAP
3D Backgrounds: Three.js + React Three Fiber
Charts: Recharts
Smooth Scroll: Lenis

Getting Started

Prerequisites
Node.js (v18+)
npm or yarn

Installation
# Clone the repository
git clone <repository-url>
cd virtual-try-on
# Install dependencies
npm install
# Start development server
npm run dev

Environment Variables
Create a .env file in the root directory:
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
For demo purposes, the app works without Firebase configuration.

Build & Deploy
# Build for production
npm run build
# Preview production build
npm run preview

Project Structure
src/
├── components/
├── contexts/
├── data/
├── firebase/
├── hooks/
├── layouts/
├── pages/
├── App.jsx
├── index.css
└── main.jsx

Pages
Landing Page (/) - Hero, features, testimonials
Login (/login) - Google OAuth sign-in
Product Selection (/products) - 10 premium products
Photo Upload (/upload) - Drag & drop upload
Try-On (/tryon) - AI generation + result
Admin (/admin) - Analytics dashboard

Design System

Colors
Background: #050816
Primary: #8B5CF6
Cyan: #06B6D4
Pink: #EC4899

Typography
Headings: Space Grotesk
Body: Inter

Demo Credentials
For admin dashboard access:
Email: admin@virtufit.com

License
MIT License - © 2027 VirtuFit

Built with ❤️ using React, Three.js, and Framer Motion