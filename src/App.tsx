import { useRef, useState, useEffect, useCallback } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccessGate } from '@/components/AccessGate'
import { NavDots } from '@/components/NavDots'
import { Section1Opening } from '@/sections/Section1Opening'
import { Section2Problem } from '@/sections/Section2Problem'
import { Section3ForgeTour } from '@/sections/Section3ForgeTour'
import { Section4Agents } from '@/sections/Section4Agents'
import { Section5Ridgeline } from '@/sections/Section5Ridgeline'
import { Section6BuildWhatLasts } from '@/sections/Section6BuildWhatLasts'
import { Section7FinancialModel } from '@/sections/Section7FinancialModel'
import { Section8TheAsk } from '@/sections/Section8TheAsk'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const SECTION_LABELS = [
  'Opening',
  'The Problem',
  'Forge Console',
  'Agent Architecture',
  'Ridgeline',
  'Build What Lasts',
  'Financial Model',
  'The Ask',
]

function Demo() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(r => r === entry.target)
            if (index !== -1) setActiveSection(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    const refs = sectionRefs.current
    refs.forEach(ref => { if (ref) observer.observe(ref) })
    return () => refs.forEach(ref => { if (ref) observer.unobserve(ref) })
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <NavDots
        sections={SECTION_LABELS}
        activeSection={activeSection}
        onDotClick={scrollToSection}
      />

      {/* Section 0 */}
      <div ref={el => { sectionRefs.current[0] = el }}>
        <Section1Opening onScrollDown={() => scrollToSection(1)} />
      </div>

      {/* Section 1 */}
      <div ref={el => { sectionRefs.current[1] = el }}>
        <Section2Problem />
      </div>

      {/* Section 2 */}
      <div ref={el => { sectionRefs.current[2] = el }}>
        <Section3ForgeTour />
      </div>

      {/* Section 3 */}
      <div ref={el => { sectionRefs.current[3] = el }}>
        <Section4Agents />
      </div>

      {/* Section 4 */}
      <div ref={el => { sectionRefs.current[4] = el }}>
        <Section5Ridgeline />
      </div>

      {/* Section 5 */}
      <div ref={el => { sectionRefs.current[5] = el }}>
        <Section6BuildWhatLasts />
      </div>

      {/* Section 6 */}
      <div ref={el => { sectionRefs.current[6] = el }}>
        <Section7FinancialModel />
      </div>

      {/* Section 7 */}
      <div ref={el => { sectionRefs.current[7] = el }}>
        <Section8TheAsk />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessGate>
        <Demo />
      </AccessGate>
    </QueryClientProvider>
  )
}
