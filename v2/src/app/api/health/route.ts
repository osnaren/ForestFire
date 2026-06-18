import { getModelPaths } from '@/lib/server/model-loader';
import { HealthResponse } from '@/lib/types';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<HealthResponse>> {
  try {
    // Check if model files exist (will download if missing)
    const { modelJsonPath } = await getModelPaths();

    await fs.access(modelJsonPath);

    return NextResponse.json<HealthResponse>({
      status: 'ok',
      model: 'available',
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json<HealthResponse>(
      {
        status: 'ok',
        model: 'unavailable',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
