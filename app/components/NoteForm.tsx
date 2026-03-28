'use client'

import { useEffect, useRef, useState } from 'react'
import type { Note } from '@/app/types'

type Props = {
  editing: Note | null
  onSubmit: (data: { title: string; content: string }) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
}

export default function NoteForm({ editing, onSubmit, onCancel, isSubmitting }: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      setTitle(editing.title)
      setContent(editing.content)
    } else {
      setTitle('')
      setContent('')
    }
    titleRef.current?.focus()
  }, [editing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    await onSubmit({ title, content })
    if (!editing) {
      setTitle('')
      setContent('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-[var(--border)] bg-[var(--card)] p-5 flex flex-col gap-4"
      style={{ boxShadow: 'var(--shadow-brut-lg)' }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest">
          {editing ? '// EDIT NOTE' : '// NEW NOTE'}
        </h2>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[var(--muted)] uppercase tracking-widest underline"
          >
            CANCEL
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-[var(--muted)]">
          TITLE
        </label>
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          required
          className="border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 text-sm w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-[var(--muted)]">
          CONTENT
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          required
          rows={8}
          className="border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 text-sm w-full resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !title.trim() || !content.trim()}
        className="border-2 border-[var(--border)] py-2 text-sm font-bold uppercase tracking-widest bg-[var(--accent)] text-[var(--foreground)] disabled:opacity-40"
        style={{ boxShadow: 'var(--shadow-brut-sm)' }}
      >
        {isSubmitting ? 'SAVING...' : editing ? 'UPDATE NOTE' : 'CREATE NOTE'}
      </button>
    </form>
  )
}
