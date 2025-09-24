# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Meu Jejum" (My Fasting) is a React Native mobile app built with Expo Router and NativeWind for intermittent fasting tracking. The app supports multiple fasting protocols, timer functionality, and journaling features.

## Development Commands

- **Start development server**: `npm start`
- **Run on Android**: `npm run android`
- **Run on iOS**: `npm run ios`
- **Run on web**: `npm run web`
- **Deploy**: `npm run deploy` (exports web build and deploys with EAS)

## Architecture

### Tech Stack
- **Framework**: React Native with Expo (~53.0.23)
- **Routing**: Expo Router v5 with file-based routing
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **UI Components**: React Native Paper v5
- **State Management**: React hooks (useState, useEffect)
- **Calendar**: react-native-calendars
- **Timer**: react-native-countdown-circle-timer
- **Navigation**: React Native Gesture Handler with Bottom Sheets (@gorhom/bottom-sheet)

### Project Structure
```
src/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── fasting.tsx    # Main timer screen
│   │   ├── journal.tsx    # Notes/diary
│   │   ├── dashboard.tsx  # Analytics
│   │   └── support.tsx    # Support info
│   ├── (screens)/         # Modal/stack screens
│   └── _layout.tsx        # Root layout with providers
├── components/            # Reusable components
├── consts/               # Static data and configurations
│   ├── plans.ts          # Fasting protocols (16:8, OMAD, etc.)
│   ├── tips.ts           # Fasting tips content
│   └── info.ts           # App information
└── global.css            # Global Tailwind styles
```

### Key Architectural Patterns

#### Navigation Structure
- **Tab Navigation**: Main app screens (fasting, journal, dashboard, support)
- **Stack Navigation**: Modal screens (settings, info, plans)
- Uses Expo Router with TypeScript path aliases (`@/*` → `./src/*`)

#### Styling Approach
- **Primary**: NativeWind classes (Tailwind CSS)
- **Secondary**: StyleSheet for complex layouts and Paper component theming
- **Theme Colors**: `#F0F8FF` (background), `#663399` (primary), `#6200ee` (accent)

#### State Management
- Local component state with hooks
- URL parameters for cross-screen data passing (e.g., selected fasting plans)
- Global state using `global` object for Bottom Sheet references

#### Component Architecture
- Functional components with TypeScript
- React Native Paper for dialogs and complex UI
- Portal pattern for modals and overlays
- Separate timer components for flexible vs fixed duration fasting

#### Data Management
- Static fasting plans in `consts/plans.ts` with typed exports
- Portuguese localization for dates and UI text
- In-memory state for notes and fasting sessions (no persistence layer currently)

## Key Features

- **Fasting Timer**: Both countdown (fixed duration) and count-up (flexible) modes
- **Multiple Protocols**: Beginner (11:13 to 15:9), Intermediate (16:8 to 19:5), Advanced (20:4 to 23:1), Prolonged (24h to 72h)
- **Journaling**: Time-stamped notes with edit/delete functionality
- **Calendar Integration**: Date picker with Brazilian Portuguese locale
- **Bottom Sheet Navigation**: Calendar and plan selection modals

## Development Notes

- TypeScript with strict typing for fasting plans and components
- NativeWind configured with Metro bundler integration
- Uses React 19 and React Native 0.79.5
- Babel configured for NativeWind JSX transforms and Reanimated
- All components follow Portuguese naming and UI text