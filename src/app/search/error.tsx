// app/error.tsx
'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="error-container">
      <h1>문제가 발생했습니다</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
