import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forrajera 19 Hermanos — Sistema POS',
  description: 'Sistema de gestión funeraria y cobranza',
  manifest: '/manifest.json',
  themeColor: '#B71C1C',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#B71C1C"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <link rel="icon" href="/icons/icon-192.png"/>
        <link rel="apple-touch-icon" href="/icons/icon-192.png"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
