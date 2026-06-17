import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Forrajera 19 Hermanos — Sistema de Ventas',
  description: 'POS multiempresa — Jalisco y Michoacán',
  manifest: '/manifest.json',
  themeColor: '#C62828',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
        <meta name="theme-color" content="#C62828"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
        <link rel="icon" href="/icons/icon-192.png"/>
        <link rel="apple-touch-icon" href="/icons/icon-192.png"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
