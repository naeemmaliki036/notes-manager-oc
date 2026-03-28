import type { Note } from '@/app/types'

type Props = {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export default function NoteCard({ note, onEdit, onDelete, isDeleting }: Props) {
  return (
    <article
      className="border-2 border-[var(--border)] bg-[var(--card)] p-5 flex flex-col gap-3"
      style={{ boxShadow: 'var(--shadow-brut)' }}
    >
      <h2 className="text-base font-bold uppercase tracking-tight leading-tight break-words">
        {note.title}
      </h2>

      <p className="text-sm text-[var(--muted)] leading-relaxed flex-1 line-clamp-4 whitespace-pre-wrap break-words">
        {note.content}
      </p>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border)]">
        <time className="text-xs text-[var(--muted)] uppercase tracking-widest">
          {formatDate(note.updatedAt)}
        </time>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="border-2 border-[var(--border)] px-3 py-1 text-xs font-bold uppercase tracking-widest"
          >
            EDIT
          </button>
          <button
            onClick={() => onDelete(note.id)}
            disabled={isDeleting}
            className="border-2 border-[var(--border)] px-3 py-1 text-xs font-bold uppercase tracking-widest bg-[var(--foreground)] text-[var(--background)] disabled:opacity-50"
          >
            {isDeleting ? '...' : 'DEL'}
          </button>
        </div>
      </div>
    </article>
  )
}
