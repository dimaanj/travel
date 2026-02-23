import { NextResponse } from 'next/server';
import { updateItinerarySchema } from '@org/api-client';
import { db } from '../../db';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const itinerary = await db.itineraries.get(id);
    if (!itinerary) {
      return NextResponse.json({ message: 'Itinerary not found' }, { status: 404 });
    }
    return NextResponse.json(itinerary);
  } catch (error) {
    console.error('GET /api/itineraries/[id]', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await db.itineraries.get(id);
    if (!existing) {
      return NextResponse.json({ message: 'Itinerary not found' }, { status: 404 });
    }
    const body = await request.json();
    const parsed = updateItinerarySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const updated = await db.itineraries.update(id, {
      ...parsed.data,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    });
    if (!updated) {
      return NextResponse.json({ message: 'Itinerary not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/itineraries/[id]', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = await db.itineraries.delete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Itinerary not found' }, { status: 404 });
    }
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/itineraries/[id]', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
