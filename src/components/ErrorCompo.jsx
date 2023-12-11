import React from 'react'

export default function ErrorCompo({resetErrorBoundary}) {
  return (
    <div>
      <p>there is some error</p>
      <button onClick={resetErrorBoundary}>try again</button>
    </div>
  );
}
