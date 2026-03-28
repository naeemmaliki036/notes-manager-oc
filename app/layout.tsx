import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import ThemeToggle from './components/ThemeToggle'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Notes Manager',
  description: 'Brutalist notes manager built with Next.js and PostgreSQL',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full`}>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&p))document.documentElement.classList.add('dark');})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {/* Header */}
        <header className="border-b-2 border-[var(--border)] bg-[var(--background)] sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black uppercase tracking-tight leading-none">
                NOTES
              </span>
              <span
                className="text-[10px] uppercase tracking-widest border border-[var(--border)] px-1.5 py-0.5 text-[var(--muted)]"
              >
                MANAGER
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>

        {/* Footer */}
        <footer className="border-t-2 border-[var(--border)] mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center">
            <span className="text-xs text-[var(--muted)] uppercase tracking-widest">
              NOTES MANAGER — NEXT.JS + POSTGRESQL
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}
