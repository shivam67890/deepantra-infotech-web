import { useState } from 'react';

// Shared photo component for program cards on both Home and Programs
// pages. Falls back to the gradient placeholder if a file is missing —
// so nothing ever shows a broken image icon.
export default function ProgramMedia({ src, alt }) {
  const [errored, setErrored] = useState(false)
  if (errored) return <div className="program-card__media" aria-hidden="true" />
  return (
    <div className="program-card__media-frame">
      <img
        src={src}
        alt={alt}
        className="program-card__media program-card__media--img"
        onError={() => setErrored(true)}
      />
    </div>
  )
}