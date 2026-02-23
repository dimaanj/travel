import { NextResponse } from 'next/server';
import { db } from '../../../db';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const itinerary = await db.itineraries.get(id);
    if (!itinerary) {
      return NextResponse.json({ message: 'Itinerary not found' }, { status: 404 });
    }
    const budget = await db.budget.ensure(id);
    return NextResponse.json(budget);
  } catch (error) {
    console.error('GET /api/itineraries/[id]/budget', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
