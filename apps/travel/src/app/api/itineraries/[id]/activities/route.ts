import { NextResponse } from 'next/server';
import { createActivitySchema } from '@org/api-client';
import { db } from '../../../db';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const itinerary = await db.itineraries.get(id);
    if (!itinerary) {
      return NextResponse.json({ message: 'Itinerary not found' }, { status: 404 });
    }
    const activities = await db.activities.list(id);
    return NextResponse.json(activities);
  } catch (error) {
    console.error('GET /api/itineraries/[id]/activities', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id: itineraryId } = await params;
    const itinerary = await db.itineraries.get(itineraryId);
    if (!itinerary) {
      return NextResponse.json({ message: 'Itinerary not found' }, { status: 404 });
    }
    const body = await request.json();
    const parsed = createActivitySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const { dayId, ...activityData } = parsed.data;
    const activity = await db.activities.add(itineraryId, dayId, {
      ...activityData,
      startTime: activityData.startTime ? new Date(activityData.startTime) : undefined,
      endTime: activityData.endTime ? new Date(activityData.endTime) : undefined,
    });
    if (!activity) {
      return NextResponse.json(
        { message: 'Day not found or could not add activity' },
        { status: 400 }
      );
    }
    return NextResponse.json(activity);
  } catch (error) {
    console.error('POST /api/itineraries/[id]/activities', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
