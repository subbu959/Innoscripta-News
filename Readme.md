# Innoscripta News Aggregator

A modern news aggregation application built with React, TypeScript, and Tailwind CSS that fetches news from multiple sources including News API, The Guardian, and The New York Times.

## Features

- **Multi-Source News Aggregation**: Fetches and displays news from three major sources:
  - News API
  - The Guardian
  - The New York Times

- **Advanced Search Capabilities**:
  - Full-text search across all news sources
  - Category-based filtering
  - Date-based filtering
  - Smart endpoint selection based on search parameters

- **Responsive Design**:
  - Desktop-optimized layout with full search capabilities
  - Mobile-friendly interface with slide-out search panel
  - Consistent component sizing and spacing
  - Touch-friendly interactions

- **Modern UI Components**:
  - Horizontal scrolling news sections
  - Animated news cards with hover effects
  - Loading states and skeletons
  - Infinite scroll for loading more articles

## Technical Architecture

### Frontend Framework
- React 18.3.1
- TypeScript
- Vite for build tooling

### Styling
- Tailwind CSS for utility-first styling
- shadcn/ui for UI components
- Custom animations and transitions
- Dark theme optimized

### State Management
- React Context API for global state
- Custom hooks for business logic
- Debounced search functionality

### API Integration
- RESTful API integration with three news sources
- Automatic pagination handling
- Error handling and loading states
- Type-safe API responses

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── Navbar.tsx     # Main navigation
│   ├── NewsCard.tsx   # Individual news article card
│   ├── NewsGrid.tsx   # News articles container
│   └── SearchBar.tsx  # Search interface
├── context/           # React context providers
│   └── NewsContext.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
│   ├── api.ts         # API integration
│   └── utils.ts       # Helper functions
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## Key Components

### NewsCard
- Displays individual news articles
- Handles missing images with placeholders
- Animated hover effects
- Consistent sizing and layout

### NewsGrid
- Horizontal scrolling container
- Navigation controls
- Loading skeletons
- Infinite scroll implementation

### Navbar
- Responsive navigation
- Search controls
- Mobile menu integration
- Brand identity

### SearchBar
- Full-text search input
- Date picker
- Category selection
- Loading states

## API Integration

### News API
- Supports both /everything and /top-headlines endpoints
- Smart endpoint selection based on search parameters
- Category-based filtering
- Date-based filtering

### The Guardian
- Content API integration
- Section-based filtering
- Custom field selection
- Pagination support

### New York Times
- Article Search API integration
- News desk filtering
- Date-based search
- Custom field mapping

## Environment Setup

Required environment variables:
```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NYT_API_KEY=your_nyt_api_key
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Performance Optimizations

- Debounced search inputs
- Lazy loading of images
- Infinite scroll implementation
- Skeleton loading states
- Optimized re-renders
- Efficient API calls

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Progressive enhancement
- Fallback support

