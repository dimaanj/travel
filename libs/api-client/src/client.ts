import type {
  ActivityDto,
  BudgetDto,
  CreateActivityDto,
  CreateItineraryDto,
  ItineraryDto,
  UpdateItineraryDto,
} from './schemas';
import { ApiError } from './errors';

export interface ApiClientConfig {
  baseUrl?: string;
}

function getBaseUrl(): string {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:4200';
}

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new ApiError(
      (data as { message?: string })?.message ?? response.statusText,
      response.status,
      data
    );
  }

  return data as T;
}

export function createApiClient(config: ApiClientConfig = {}) {
  const baseUrl = config.baseUrl ?? getBaseUrl();

  function url(path: string): string {
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${p}`;
  }

  async function request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(url(path), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return handleResponse<T>(res);
  }

  return {
    itineraries: {
      list: () =>
        request<ItineraryDto[]>('/api/itineraries'),

      get: (id: string) =>
        request<ItineraryDto>(`/api/itineraries/${id}`),

      create: (body: CreateItineraryDto) =>
        request<ItineraryDto>('/api/itineraries', {
          method: 'POST',
          body: JSON.stringify(body),
        }),

      update: (id: string, body: UpdateItineraryDto) =>
        request<ItineraryDto>(`/api/itineraries/${id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
        }),

      delete: (id: string) =>
        request<void>(`/api/itineraries/${id}`, { method: 'DELETE' }),
    },

    activities: {
      list: (itineraryId: string) =>
        request<ActivityDto[]>(`/api/itineraries/${itineraryId}/activities`),

      create: (itineraryId: string, body: CreateActivityDto) =>
        request<ActivityDto>(
          `/api/itineraries/${itineraryId}/activities`,
          {
            method: 'POST',
            body: JSON.stringify(body),
          }
        ),
    },

    budget: {
      get: (itineraryId: string) =>
        request<BudgetDto>(`/api/itineraries/${itineraryId}/budget`),
    },
  };
}

export const apiClient = createApiClient();
