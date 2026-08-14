"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={styles.main}>
      <h1 style={styles.h2}>Something went wrong</h1>
      <p>
        Something unexpected happened. Try again, or head back to the
        homepage.
      </p>

      <button onClick={() => reset()} style={styles.link}>
        Try again
      </button>
    </main>
  );
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
