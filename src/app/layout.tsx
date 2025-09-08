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
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Husband Material" />
        <meta property="fb:app_id" content="1234567890" />

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