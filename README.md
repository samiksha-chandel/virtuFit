# VirtuFit

VirtuFit is a virtual fashion try-on web application that allows users to browse fashion products, upload photos, preview garments through overlay-based visualization, and explore analytics through an administrative dashboard.

## Features

* Virtual garment try-on experience
* Google Authentication using Firebase
* Photo upload with drag-and-drop support
* Product catalog and selection flow
* Downloadable try-on results
* Admin analytics dashboard
* Responsive design for desktop and mobile devices
* Modern animations and interactive UI

## Tech Stack

**Frontend:** React, Vite

**Styling:** Tailwind CSS

**Routing:** React Router

**Authentication:** Firebase Authentication (Google OAuth)

**Animations:** Framer Motion, GSAP

**3D Visual Effects:** Three.js, React Three Fiber, Drei

**Charts & Analytics:** Recharts

**Smooth Scrolling:** Lenis

## Running the Project Locally

### Prerequisites

* Node.js (v18 or later)
* npm

### Installation

```bash
git clone <repository-url>
cd virtuFit
npm install
```

### Environment Variables

Create a `.env` file in the project root and add:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Start Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
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
```

## Known Limitations

* The try-on functionality uses garment overlay visualization and does not perform real AI-based clothing generation.
* Product data and analytics data are demonstration data.
* Admin analytics are intended for showcase purposes.
* Google authentication requires valid Firebase configuration.

## Libraries Used

* React
* Vite
* Tailwind CSS
* React Router
* Firebase
* Framer Motion
* GSAP
* Three.js
* React Three Fiber
* Drei
* Recharts
* Lenis
