import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(notes)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content } = body

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const note = await prisma.note.create({
      data: { title: title.trim(), content: content.trim() },
    })
    return NextResponse.json(note, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}
