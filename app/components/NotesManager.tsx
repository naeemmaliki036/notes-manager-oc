'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Note } from '@/app/types'
import NoteCard from './NoteCard'
import NoteForm from './NoteForm'

export default function NotesManager() {
  const [notes, setNotes] = useState<Note[]>([])
  const [editing, setEditing] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch('/api/notes')
      if (!res.ok) throw new Error('Failed to load notes')
      const data = await res.json()
      setNotes(data)
    } catch {
      setError('Could not load notes. Is the database running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleSubmit = async (data: { title: string; content: string }) => {
    setSubmitting(true)
    try {
      if (editing) {
        const res = await fetch(`/api/notes/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error('Update failed')
        const updated: Note = await res.json()
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))
        setEditing(null)
      } else {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error('Create failed')
        const created: Note = await res.json()
        setNotes((prev) => [created, ...prev])
      }
    } catch {
      setError('Operation failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setNotes((prev) => prev.filter((n) => n.id !== id))
      if (editing?.id === id) setEditing(null)
    } catch {
      setError('Delete failed. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">
      {/* Form panel — sticky on desktop */}
      <aside className="w-full lg:w-80 lg:sticky lg:top-6 shrink-0">
        <NoteForm
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
          isSubmitting={submitting}
        />
      </aside>

      {/* Notes grid */}
      <main className="flex-1 min-w-0">
        {error && (
          <div className="border-2 border-[var(--border)] bg-[var(--accent)] px-4 py-3 mb-5 text-sm font-bold uppercase tracking-wide flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-xs underline ml-4"
            >
              DISMISS
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-widest text-[var(--muted)]">
            {loading ? 'LOADING...' : `${notes.length} NOTE${notes.length !== 1 ? 'S' : ''}`}
          </span>
        </div>

        {loading ? (
          <div className="border-2 border-[var(--border)] p-8 text-center text-sm text-[var(--muted)] uppercase tracking-widest">
            LOADING NOTES...
          </div>
        ) : notes.length === 0 ? (
          <div
            className="border-2 border-[var(--border)] bg-[var(--card)] p-12 text-center"
            style={{ boxShadow: 'var(--shadow-brut)' }}
          >
            <p className="text-sm uppercase tracking-widest text-[var(--muted)]">
              NO NOTES YET
            </p>
            <p className="text-xs text-[var(--muted)] mt-2">
              Create your first note using the form.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={setEditing}
                onDelete={handleDelete}
                isDeleting={deletingId === note.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
