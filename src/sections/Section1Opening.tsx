import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, Zap, FolderOpen, FileText, Bot } from 'lucide-react'
import { useDemoStats } from '@/hooks/useSupabaseStats'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { SkeletonBlock } from '@/components/SkeletonBlock'

const STAT_CARDS = [
  { key: 'totalTasks', label: 'Total tasks in system', icon: Zap, color: '#E8614B' },
  { key: 'activeProjects', label: 'Active projects', icon: FolderOpen, color: '#22C55E' },
  { key: 'contentPieces', label: 'Content in pipeline', icon: FileText, color: '#F59E0B' },
  { key: 'agentRunsThisWeek', label: 'Agent runs this week', icon: Bot, color: '#8A9BC0' },
] as const

interface Section1Props {
  onScrollDown: () => void
}

export function Section1Opening({ onScrollDown }: Section1Props) {
  const { data: stats, isLoading } = useDemoStats()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="section-snap min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20"
      style={{ backgroundColor: '#111B30' }}
    >
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: '#E8614B' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: '#1B2B4B' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#8A9BC0 1px, transparent 1px), linear-gradient(90deg, #8A9BC0 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-widest"
          style={{ backgroundColor: 'rgba(232,97,75,0.15)', color: '#E8614B', border: '1px solid rgba(232,97,75,0.3)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8614B] animate-pulse" />
          Live Data -- Updated Now
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-bold leading-tight mb-6"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
          }}
        >
          Built by one person.{' '}
          <span style={{ color: '#E8614B' }}>Powered by AI agents.</span>
          <br />
          Running 5 projects simultaneously.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base mb-12"
          style={{ color: '#8A9BC0', maxWidth: '560px', margin: '0 auto 3rem' }}
        >
          Lucas Oliver -- VP of Sales turned founder -- September 2026 exit
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {STAT_CARDS.map(({ key, label, icon: Icon, color }) => (
            <div
              key={key}
              className="p-5 rounded-2xl flex flex-col items-center gap-2 text-center"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <Icon size={20} style={{ color }} />
              {isLoading ? (
                <SkeletonBlock className="w-16 h-8" />
              ) : (
                <span className="text-3xl font-bold" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  <AnimatedCounter value={stats?.[key] ?? 0} duration={1800} />
                </span>
              )}
              <span className="text-xs" style={{ color: '#8A9BC0' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          onClick={onScrollDown}
          className="inline-flex flex-col items-center gap-2 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="text-sm font-medium" style={{ color: '#8A9BC0' }}>See how</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} style={{ color: '#E8614B' }} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
