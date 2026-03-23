import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DollarSign, TrendingUp, Target, AlertTriangle } from 'lucide-react'
import { useFinancialModel } from '@/hooks/useSupabaseStats'
import { AnimatedCounter } from '@/components/AnimatedCounter'

const SCENARIOS = [
  {
    label: 'Conservative',
    clients: 8,
    mrr: 7576,
    description: '8 Ridgeline clients -- below exit threshold',
    color: '#8A9BC0',
    icon: AlertTriangle,
    note: 'Viable but not the goal',
  },
  {
    label: 'Moderate',
    clients: 12,
    mrr: 15664,
    description: '12 clients + book + consulting',
    color: '#F59E0B',
    icon: Target,
    note: 'The exit scenario',
  },
  {
    label: 'Aggressive',
    clients: 18,
    mrr: 26746,
    description: '18 clients + full stack revenue',
    color: '#22C55E',
    icon: TrendingUp,
    note: 'Freedom number',
  },
]

const MAX_MRR = 26746
const MONTHLY_BURN = 11500
const EXIT_TARGET = 15000

const TIMELINE = [
  { month: 'Apr 2026', event: 'Book launch', color: '#E8614B' },
  { month: 'May 2026', event: 'First 5 Ridgeline clients', color: '#F59E0B' },
  { month: 'Jun 2026', event: 'Reach break-even', color: '#22C55E' },
  { month: 'Aug 2026', event: 'Exit threshold hit', color: '#22C55E' },
  { month: 'Sep 2026', event: 'Target exit', color: '#E8614B' },
]

export function Section7FinancialModel() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { data: financialData } = useFinancialModel()

  const monthlyBurn = financialData?.monthly_burn ?? MONTHLY_BURN

  return (
    <section
      ref={ref}
      className="section-snap min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20"
      style={{ backgroundColor: '#111B30' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#E8614B' }}>
            Financial Model
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}
          >
            The math works.{' '}
            <span style={{ color: '#E8614B' }}>Here is the proof.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Scenarios */}
          <div className="space-y-5">
            {/* Current baseline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="p-4 rounded-2xl flex items-center justify-between"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <div className="flex items-center gap-3">
                <DollarSign size={16} style={{ color: '#8A9BC0' }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Current MRR</p>
                  <p className="text-xs" style={{ color: '#8A9BC0' }}>Honest baseline</p>
                </div>
              </div>
              <span className="text-2xl font-bold" style={{ color: '#8A9BC0' }}>$0</span>
            </motion.div>

            {/* Scenario bars */}
            <div className="space-y-4">
              {SCENARIOS.map((scenario, i) => {
                const Icon = scenario.icon
                return (
                  <motion.div
                    key={scenario.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.12 }}
                    className="p-4 rounded-2xl"
                    style={{
                      backgroundColor: '#243456',
                      border: `1px solid ${scenario.color}33`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color: scenario.color }} />
                        <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>{scenario.label}</span>
                      </div>
                      <span className="text-lg font-bold" style={{ color: scenario.color }}>
                        $<AnimatedCounter value={scenario.mrr} duration={1600} />/mo
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: '#1B2B4B' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(scenario.mrr / MAX_MRR) * 100}%` } : {}}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: 'easeOut' }}
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: scenario.color }}
                      >
                        {/* Exit threshold marker */}
                        {scenario.mrr > EXIT_TARGET && (
                          <div
                            className="absolute top-0 bottom-0 w-0.5"
                            style={{
                              left: `${(EXIT_TARGET / scenario.mrr) * 100}%`,
                              backgroundColor: 'rgba(255,255,255,0.5)',
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs" style={{ color: '#8A9BC0' }}>{scenario.description}</p>
                      <span
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: `${scenario.color}22`, color: scenario.color }}
                      >
                        {scenario.note}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Burn rate */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              className="p-4 rounded-2xl flex items-center justify-between"
              style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Monthly Burn</p>
                <p className="text-xs" style={{ color: '#8A9BC0' }}>All-in run rate</p>
              </div>
              <span className="text-2xl font-bold" style={{ color: '#EF4444' }}>
                ${monthlyBurn.toLocaleString()}
              </span>
            </motion.div>
          </div>

          {/* Right: Timeline + key insight */}
          <div className="space-y-5">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8A9BC0' }}>
                Path to Exit -- April to September 2026
              </p>
              <div className="relative">
                <div
                  className="absolute left-4 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: '#1B2B4B' }}
                />
                <div className="space-y-5">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.month}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-4 relative"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: 0.55 + i * 0.1, type: 'spring' }}
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ backgroundColor: `${item.color}22`, border: `2px solid ${item.color}` }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      </motion.div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: item.color }}>{item.month}</p>
                        <p className="text-sm" style={{ color: '#FFFFFF' }}>{item.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Key insight */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: 'rgba(232,97,75,0.08)', border: '1px solid rgba(232,97,75,0.25)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                The September 2026 exit requires the moderate scenario. The moderate scenario requires{' '}
                <span style={{ color: '#F59E0B', fontWeight: 600 }}>12 paying Ridgeline clients.</span>
              </p>
              <p className="text-xs mt-3" style={{ color: '#8A9BC0' }}>
                That is 1 new client every 2.5 weeks from today. Achievable with a focused outbound motion.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
