"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <h2>Something went wrong!</h2>
          <div>{error.message}</div>
          <button onClick={reset}>다시 시도</button>
        </div>
      </body>
    </html>
  );
}
