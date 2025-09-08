import { NextResponse } from 'next/server';

import { fetchData } from "@/lib/dynamoService";

export async function GET() {
    var data = await fetchData();
  return NextResponse.json(data.data);
}
