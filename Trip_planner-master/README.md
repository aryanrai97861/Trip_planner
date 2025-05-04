# Travel Itinerary App

## Project Overview
This is a modern, responsive travel itinerary application built with React, TypeScript, Material-UI, and Vite. The app is designed to provide a seamless, Figma-accurate user experience for planning and managing trips, including onboarding, dashboard, activities, and integrations.

## Project Structure & Hierarchy

```
src/
├── components/     # Reusable React components (TripCard, ActivityCard, layout, etc.)
├── pages/          # Main pages (Onboarding, Dashboard)
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── styles/         # Global styles and theme
├── types/          # TypeScript type definitions (Trip, Activity, etc.)
└── assets/         # Static assets (images, icons)
```

### Main Files & Folders
- **App.tsx**: Sets up global theme, routing, and color mode context.
- **pages/Onboarding.tsx**: Onboarding form for user trip preferences, with dark/light mode toggle.
- **pages/Dashboard.tsx**: Main dashboard with:
  - Header (greeting, avatar, dark/light toggle)
  - Main trip card (image, title, dates)
  - Flight and accommodation cards
  - Activities section (filter tabs, list, third pane for details)
  - Add/Edit/Delete/Mark as Completed for activities
  - Mock Google Calendar integration
  - Responsive bottom navigation (mobile)
- **components/**: Contains reusable UI components (cards, layout, navigation, etc.)
- **styles/theme.ts**: Material-UI theme configuration for consistent styling and dark/light mode.
- **types/index.ts**: TypeScript interfaces for all main data structures.

## How It Works
- **Onboarding**: User enters trip preferences (destination, duration, group) and proceeds to dashboard.
- **Dashboard**: Displays trip overview, flight, accommodation, and activities. All sections are interactive:
  - **Activities**: Filter by status, add new, edit, delete, mark as completed, and (mock) sync to Google Calendar.
  - **Third Pane**: Clicking an activity opens a detailed view in a right-side pane (desktop) or drawer (mobile).
  - **Dark/Light Mode**: Toggle available globally, theme updates instantly.
- **State Management**: All user actions update React state. API integration points are mocked and ready for real endpoints.
- **Responsiveness**: Layout adapts for desktop and mobile, including bottom navigation for mobile.

## Development & Customization
- Built with React 18+, TypeScript, Material-UI v7+, React Router, and Vite.
- Easily extendable for real API integration (see mock Google Calendar sync in Dashboard).
- All code is well-documented with clear comments for maintainability.

---

# React Three-Pane Application

A modern React application with a three-pane layout structure, built using Material-UI and React Router.

## Features

- Three-pane layout with collapsible side panels
- Responsive design
- Material-UI components and theming
- React Router for navigation
- TypeScript support

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── styles/        # Global styles and theme
├── types/         # TypeScript type definitions
└── assets/        # Static assets
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Component Hierarchy & Prop Documentation

### App
- Sets up theme, routing, and layout.

### Layout
- Three-pane structure (left, main, right).
- Props: `children: React.ReactNode`

### Onboarding
- Onboarding form for trip details.
- Uses local state and mock data.

### Dashboard
- Main dashboard content, uses:
  - `TripCard` (props: `city`, `image`, `flight`)
  - `AccommodationCard` (props: `name`, `image`)
  - `ActivityCard` (props: `name`, `type`, `image`)
  - `BottomNavBar` (no props, handles navigation state internally)

### RightPaneContent
- Displays trip details and actions in the right drawer.
- Uses mock data.

### BottomNavBar
- Responsive bottom navigation for mobile.
- No props; manages its own state.

## Development

The application uses:
- React 18+
- TypeScript
- Material-UI v7+
- React Router
- Vite

## Building for Production

```bash
npm run build
```

## License

MIT
