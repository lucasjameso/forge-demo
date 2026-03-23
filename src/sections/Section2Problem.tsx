import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, BookOpen, Linkedin, Users, Building2, ArrowRight } from 'lucide-react'

const CHAOS_NODES = [
  { id: 'job', label: 'VP of Sales', sub: 'Full-time corporate role', icon: Briefcase, color: '#F59E0B', x: 15, y: 20 },
  { id: 'forge', label: 'Forge Console', sub: 'SaaS product build', icon: Building2, color: '#E8614B', x: 70, y: 10 },
  { id: 'ridgeline', label: 'Ridgeline', sub: '$40B market opportunity', icon: Building2, color: '#22C55E', x: 85, y: 50 },
  { id: 'book', label: 'CLARITY Book', sub: 'Launch April 17, 2026', icon: BookOpen, color: '#8A9BC0', x: 65, y: 82 },
  { id: 'linkedin', label: 'LinkedIn', sub: '6,549 followers', icon: Linkedin, color: '#0A66C2', x: 20, y: 75 },
  { id: 'family', label: 'Family', sub: 'Wife Egan', icon: Users, color: '#EC4899', x: 5, y: 48 },
]

const CENTER = { x: 43, y: 46 }

const CONNECTIONS = [
  ['job', 'forge'],
  ['job', 'ridgeline'],
  ['forge', 'ridgeline'],
  ['book', 'linkedin'],
  ['forge', 'book'],
  ['ridgeline', 'book'],
  ['family', 'job'],
  ['linkedin', 'forge'],
]

export function Section2Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [phase] = useState<'chaos' | 'system'>('chaos')

  function getNodePos(id: string) {
    const node = CHAOS_NODES.find(n => n.id === id)
    return node ? { x: node.x, y: node.y } : CENTER
  }

  return (
    <section
      ref={ref}
      className="section-snap min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20"
      style={{ backgroundColor: '#1B2B4B' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#E8614B' }}>
            The Problem
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}
          >
            Most founders drop balls.{' '}
            <span style={{ color: '#E8614B' }}>The good ones build systems.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#8A9BC0' }}>
            Managing five simultaneous projects, a corporate job, a book launch, a content pipeline, and a family is not a time management problem. It is a systems problem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Chaos diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative w-full aspect-square max-w-md mx-auto"
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              style={{ overflow: 'visible' }}
            >
              {/* Connection lines */}
              {CONNECTIONS.map(([from, to], i) => {
                const a = getNodePos(from)
                const b = getNodePos(to)
                return (
                  <motion.line
                    key={`${from}-${to}`}
                    x1={`${a.x}%`}
                    y1={`${a.y}%`}
                    x2={`${b.x}%`}
                    y2={`${b.y}%`}
                    stroke="rgba(138,155,192,0.2)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  />
                )
              })}
            </svg>

            {/* Node cards */}
            {CHAOS_NODES.map((node, i) => {
              const Icon = node.icon
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? {
                    opacity: 1,
                    scale: 1,
                    x: phase === 'chaos' ? [0, (Math.random() - 0.5) * 8, 0] : 0,
                  } : {}}
                  transition={{
                    opacity: { delay: 0.4 + i * 0.1, duration: 0.4 },
                    scale: { delay: 0.4 + i * 0.1, duration: 0.4, type: 'spring' },
                    x: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
                  }}
                  className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#243456',
                    border: `1px solid ${node.color}33`,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={12} style={{ color: node.color }} />
                  {node.label}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right side: item list + transition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-4"
          >
            {CHAOS_NODES.map((node, i) => {
              const Icon = node.icon
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: '#1B2B4B', border: '1px solid rgba(138,155,192,0.1)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${node.color}22` }}
                  >
                    <Icon size={16} style={{ color: node.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>{node.label}</div>
                    <div className="text-xs" style={{ color: '#8A9BC0' }}>{node.sub}</div>
                  </div>
                </motion.div>
              )
            })}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-2 pt-2"
            >
              <ArrowRight size={16} style={{ color: '#E8614B' }} />
              <span className="text-sm font-semibold" style={{ color: '#E8614B' }}>
                There is another way.
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
