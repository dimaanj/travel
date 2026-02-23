import { NextResponse } from 'next/server';
import { createItinerarySchema } from '@org/api-client';
import { db } from '../db';

export async function GET() {
  try {
    const list = await db.itineraries.getAll();
    return NextResponse.json(list);
  } catch (error) {
    console.error('GET /api/itineraries', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createItinerarySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const { startDate, endDate, ...rest } = parsed.data;
    const days: { date: Date; notes?: string }[] = [];
    const current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      days.push({ date: new Date(current) });
      current.setDate(current.getDate() + 1);
    }
    const itinerary = await db.itineraries.create({
      ...rest,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      ownerId: rest.ownerId ?? 'anonymous',
      days,
    });
    return NextResponse.json(itinerary);
  } catch (error) {
    console.error('POST /api/itineraries', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
