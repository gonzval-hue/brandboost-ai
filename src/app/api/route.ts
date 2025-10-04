// app/api/dashboard/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Datos de prueba mock
    const mockData = {
      totalClients: Math.floor(Math.random() * 100),
      totalCampaigns: Math.floor(Math.random() * 50),
      generatedContent: Math.floor(Math.random() * 500),
      scheduledPosts: Math.floor(Math.random() * 20),
    }

    return NextResponse.json(mockData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener datos del dashboard' },
      { status: 500 }
    )
  }
}