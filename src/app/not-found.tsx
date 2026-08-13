import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <main style={styles.main}>
      <h2 style={styles.h2}>404 - Page Not Found</h2>
      <p>The resource you are looking for does not exist.</p>
      <Link href="/" style={styles.link}>
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