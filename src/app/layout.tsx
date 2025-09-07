import type { Metadata } from 'next'
import './index.css'
import "./App.css"
import Analytics from "./analytics";
import { AuthProvider } from '../components/AuthContext';

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
              <AuthProvider>
                {children}
              </AuthProvider>
            </main>
        </body>
      </html>
    )
}