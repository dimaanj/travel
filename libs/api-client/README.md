# @org/api-client

Typed API client and React Query integration for the Travel Itinerary API.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/itineraries` | List all itineraries |
| POST | `/api/itineraries` | Create itinerary (body: `CreateItineraryDto`) |
| GET | `/api/itineraries/[id]` | Get itinerary by id |
| PUT | `/api/itineraries/[id]` | Update itinerary (body: `UpdateItineraryDto`) |
| DELETE | `/api/itineraries/[id]` | Delete itinerary |
| GET | `/api/itineraries/[id]/activities` | List activities for itinerary |
| POST | `/api/itineraries/[id]/activities` | Add activity (body: `CreateActivityDto`, requires `dayId`) |
| GET | `/api/itineraries/[id]/budget` | Get budget for itinerary |

## Usage

```ts
import { apiClient, useItineraries, useItinerary, useCreateActivity } from '@org/api-client';

// Direct client
const list = await apiClient.itineraries.list();
const one = await apiClient.itineraries.get(id);

// React Query hooks (wrap app with QueryClientProvider)
const { data, isLoading } = useItineraries();
const { data: itinerary } = useItinerary(id);
const createActivity = useCreateActivity(itineraryId);
createActivity.mutate({ title: 'Lunch', dayId: dayId });
```

## Validation

Request bodies are validated with Zod schemas. See `schemas/` for DTOs and validation rules.
