import type { Metadata } from 'next'
import '../index.css'
import "./App.css"
import Analytics from "./analytics";

export const metadata: Metadata = {
  title: 'Husband Material',
  description: 'Web site created with Next.js.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    return (
      <html lang="en">
        <body>
            <main className="App">
              <Analytics />
                {children}
            </main>
        </body>
      </html>
    )
}