import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata = {
  title: "Page Not Found — STron",
  description: "The page you're looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

const NotFound = () => {
  return (
    <main style={styles.main}>
      <h2 style={styles.h2}>404 - Page Not Found</h2>
      <p>The resource you are looking for does not exist.</p>
      <Link href="/" style={styles.link} aria-label="Return to Home Page" aria-describedby="return-home-description">
        Return Home
      </Link>
    </main>
  )
}

const styles = {
  main: {
        textAlign: 'center',
        padding: '4rem',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
  } as React.CSSProperties,
  h2: {
        fontSize: '2rem',
        fontWeight: 'bold',
  } as React.CSSProperties,
  link: {
        textDecoration: 'underline',
  } as React.CSSProperties
}

export default NotFound