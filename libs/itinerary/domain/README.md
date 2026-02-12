# Itinerary Domain

This library contains the core domain models for the travel itinerary builder application.

## Domain Models

- **User**: Represents a user in the system
- **Activity**: Represents a single activity in an itinerary (e.g., visit museum, dinner)
- **Day**: Represents a single day in an itinerary with its activities
- **Budget**: Represents the budget for an itinerary with categories
- **Itinerary**: Represents a complete travel itinerary with days, budget, and collaborators

## Architecture

This library follows clean architecture principles:
- Pure TypeScript interfaces and types
- No framework dependencies
- Domain logic encapsulated in helper functions
- Value objects for IDs

## Usage

```typescript
import { 
  Itinerary, 
  createItinerary, 
  Activity, 
  Day 
} from '@org/itinerary-domain';

// Create a new itinerary
const itinerary = createItinerary(
  'itinerary-1',
  'Europe Trip',
  new Date('2024-06-01'),
  new Date('2024-06-15'),
  'user-1'
);
```
