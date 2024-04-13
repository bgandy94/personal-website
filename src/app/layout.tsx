import Link from 'next/link'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Brandon Gandy's Personal Site",
  description: 'Portfolio site for Brandon Gandy',
}

const Nav = () => {
  return (
    <header className="bg-primary h-[3rem] text flex-row flex">
      {[
        ['Home', '/'],
        ['Projects', '/projects'],
      ].map(([title, path]) => (
        <Link
          key={title}
          className="hover:font-bold cursor-pointer h-full ml-5 leading-[3rem]"
          href={path}
        >
          {title}
        </Link>
      ))}
    </header>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className + ' bg-background text-white'}>
        <Nav />

        <main className="h-screen flex items-center flex-col color-primary px-4 py-4">
          {children}
        </main>
      </body>
    </html>
  )
}
