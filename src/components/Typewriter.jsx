import {
  useEffect,
  useState,
} from 'react';

// Types out `text` one character at a time, then leaves a blinking
// cursor behind. Respects prefers-reduced-motion by just showing the
// full text immediately instead of animating.
export default function Typewriter({ text, speed = 90, startDelay = 300 }) {
  const [visibleChars, setVisibleChars] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisibleChars(text.length)
      setDone(true)
      return
    }

    let i = 0
    let intervalId

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1
        setVisibleChars(i)
        if (i >= text.length) {
          clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(intervalId)
    }
  }, [text, speed, startDelay])

  return (
    <span className="typewriter">
      {text.slice(0, visibleChars)}
      <span className={'typewriter__cursor' + (done ? ' typewriter__cursor--blink' : '')}>|</span>
    </span>
  )
}