import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Linkedin, FileText, Calendar } from 'lucide-react'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { differenceInDays, format } from 'date-fns'

const LAUNCH_DATE = new Date('2026-04-17')
const BOOK_SERIES = [
  { title: 'CLARITY', subtitle: 'Kill the Hero', launch: 'April 17, 2026', status: 'active', color: '#E8614B' },
  { title: 'CONTROL', subtitle: 'The Operating System', launch: '2027', status: 'planned', color: '#8A9BC0' },
  { title: 'Book 3', subtitle: 'TBD', launch: '2028', status: 'planned', color: '#8A9BC0' },
  { title: 'Book 4', subtitle: 'TBD', launch: '2029', status: 'planned', color: '#8A9BC0' },
]

export function Section6BuildWhatLasts() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const daysToLaunch = Math.max(0, differenceInDays(LAUNCH_DATE, new Date()))
  const FOLLOWER_COUNT = 6549

  return (
    <section
      ref={ref}
      className="section-snap min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20"
      style={{ backgroundColor: '#1B2B4B' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#E8614B' }}>
            Build What Lasts
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}
          >
            The brand.{' '}
            <span style={{ color: '#E8614B' }}>The book. The audience.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Book + countdown */}
          <div className="space-y-5">
            {/* Book card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(232,97,75,0.25)' }}
            >
              <div className="flex gap-5">
                {/* Book cover placeholder */}
                <div
                  className="w-24 h-32 rounded-xl flex-shrink-0 flex flex-col items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #E8614B 0%, #1B2B4B 100%)',
                    border: '1px solid rgba(232,97,75,0.4)',
                  }}
                >
                  <BookOpen size={24} style={{ color: '#FFFFFF' }} className="mb-2" />
                  <span className="text-xs font-bold text-center px-2 leading-tight" style={{ color: '#FFFFFF' }}>
                    CLARITY
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>CLARITY: Kill the Hero</h3>
                  <p className="text-sm mb-3" style={{ color: '#8A9BC0' }}>
                    How high-performers escape the hero trap and build systems that outlast them.
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} style={{ color: '#E8614B' }} />
                    <span className="text-sm font-medium" style={{ color: '#E8614B' }}>
                      {format(LAUNCH_DATE, 'MMMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="p-5 rounded-2xl text-center"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8A9BC0' }}>Days to Launch</p>
              <div className="text-6xl font-bold mb-1" style={{ color: '#E8614B', letterSpacing: '-0.03em' }}>
                <AnimatedCounter value={daysToLaunch} duration={1500} />
              </div>
              <p className="text-sm" style={{ color: '#8A9BC0' }}>
                April 17, 2026
              </p>
            </motion.div>

            {/* Book series */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8A9BC0' }}>4-Book Series Roadmap</p>
              <div className="flex gap-2">
                {BOOK_SERIES.map((book, i) => (
                  <motion.div
                    key={book.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex-1 p-2.5 rounded-xl text-center"
                    style={{
                      backgroundColor: '#1B2B4B',
                      border: `1px solid ${book.color}44`,
                      opacity: book.status === 'active' ? 1 : 0.6,
                    }}
                  >
                    <div className="text-xs font-bold mb-0.5" style={{ color: book.color }}>{book.title}</div>
                    <div className="text-xs leading-tight" style={{ color: '#8A9BC0' }}>{book.launch}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: LinkedIn + Content */}
          <div className="space-y-5">
            {/* LinkedIn stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="p-6 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(10,102,194,0.3)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Linkedin size={18} style={{ color: '#0A66C2' }} />
                <span className="font-semibold" style={{ color: '#FFFFFF' }}>LinkedIn Audience</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    <AnimatedCounter value={FOLLOWER_COUNT} duration={2000} />
                  </div>
                  <p className="text-xs" style={{ color: '#8A9BC0' }}>Followers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#22C55E', letterSpacing: '-0.02em' }}>
                    <AnimatedCounter value={10000} duration={2200} />
                  </div>
                  <p className="text-xs" style={{ color: '#8A9BC0' }}>Target by launch</p>
                </div>
              </div>

              {/* Growth bar */}
              <div>
                <div className="flex justify-between text-xs mb-1.5" style={{ color: '#8A9BC0' }}>
                  <span>Progress to 10K</span>
                  <span style={{ color: '#22C55E' }}>{Math.round((FOLLOWER_COUNT / 10000) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1B2B4B' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(FOLLOWER_COUNT / 10000) * 100}%` } : {}}
                    transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#22C55E' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Content velocity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} style={{ color: '#F59E0B' }} />
                <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Content Engine</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: 3, label: 'Posts/week', color: '#F59E0B' },
                  { value: 52, label: 'Weeks/year', color: '#8A9BC0' },
                  { value: 156, label: 'Posts/year', color: '#E8614B' },
                ].map(({ value, label, color }) => (
                  <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: '#1B2B4B' }}>
                    <div className="text-2xl font-bold mb-0.5" style={{ color, letterSpacing: '-0.02em' }}>
                      <AnimatedCounter value={value} duration={1200} />
                    </div>
                    <div className="text-xs" style={{ color: '#8A9BC0' }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: 'rgba(232,97,75,0.08)', border: '1px solid rgba(232,97,75,0.2)' }}
            >
              <p className="text-sm italic leading-relaxed" style={{ color: '#FFFFFF' }}>
                "The content is not marketing. The content is the long game. Every post is a signal to the market that this founder thinks clearly and builds systems."
              </p>
              <p className="text-xs mt-3" style={{ color: '#E8614B' }}>-- Lucas Oliver</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
