import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered reveal hook.
 * Returns { ref, style } where the style transitions from invisible/lifted
 * to visible/in-place once the element enters the viewport.
 */
export default function useScrollReveal(delay = 0, opts = {}) {
  const { distance = 18, duration = 0.5 } = opts
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If element is already in view OR scrolled past, reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : `translateY(${distance}px) scale(0.98)`,
      transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'transform, opacity',
    },
  }
}
