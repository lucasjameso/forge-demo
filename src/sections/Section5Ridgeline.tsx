import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, TrendingUp, Users, CheckCircle } from 'lucide-react'
import { AnimatedCounter } from '@/components/AnimatedCounter'

const PRICING_TIERS = [
  { name: 'Starter', price: 297, features: ['CRM', 'Project tracking', 'Basic reporting'], color: '#8A9BC0' },
  { name: 'Growth', price: 597, features: ['All Starter', 'Estimating', 'BI dashboards', 'Integrations'], color: '#E8614B', popular: true },
  { name: 'Enterprise', price: 1197, features: ['All Growth', 'Custom workflows', 'Dedicated support', 'API access'], color: '#22C55E' },
]

const MARKET_BARS = [
  { label: 'TAM', value: 40, unit: 'B', description: 'Specialty trade software market', color: '#E8614B' },
  { label: 'SAM', value: 2, unit: 'B', description: 'CRM + PM segment', color: '#F59E0B' },
  { label: 'SOM', value: 50, unit: 'M', description: 'Realistic 5-year capture', color: '#22C55E' },
]

export function Section5Ridgeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

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
            Ridgeline Intelligence
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}
          >
            The revenue vehicle.{' '}
            <span style={{ color: '#E8614B' }}>Built for the $40B specialty trade contractor market.</span>
          </h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: '#8A9BC0' }}>
            CRM + project management + estimating + business intelligence -- purpose-built for specialty trade contractors. One platform. No more spreadsheets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Market + POC */}
          <div className="space-y-6">
            {/* Market bars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} style={{ color: '#E8614B' }} />
                <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Market Opportunity</span>
              </div>
              <div className="space-y-4">
                {MARKET_BARS.map((bar, i) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{bar.label}</span>
                      <span className="text-sm font-bold" style={{ color: bar.color }}>
                        ${bar.value}{bar.unit}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1B2B4B' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${[100, 30, 5][i]}%` } : {}}
                        transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: bar.color }}
                      />
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#8A9BC0' }}>{bar.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* POC Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={16} style={{ color: '#22C55E' }} />
                <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Proof of Concept</span>
              </div>
              <p className="text-sm" style={{ color: '#FFFFFF' }}>
                Active pilot with specialty contractor in Wake Forest, NC
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs" style={{ color: '#22C55E' }}>Live pilot -- collecting feedback</span>
              </div>
            </motion.div>

            {/* Path to $10K MRR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} style={{ color: '#F59E0B' }} />
                <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Path to $10K MRR</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold" style={{ color: '#F59E0B', letterSpacing: '-0.02em' }}>
                  <AnimatedCounter value={17} duration={1500} />
                </span>
                <span className="text-sm" style={{ color: '#8A9BC0' }}>Growth tier clients needed</span>
              </div>
              <p className="text-xs mt-2" style={{ color: '#8A9BC0' }}>
                17 x $597 = $10,149/month -- exit threshold
              </p>
            </motion.div>
          </div>

          {/* Right: Pricing tiers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={16} style={{ color: '#8A9BC0' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Pricing Tiers</span>
            </div>
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="p-5 rounded-2xl relative"
                style={{
                  backgroundColor: '#243456',
                  border: `1px solid ${tier.popular ? tier.color + '44' : 'rgba(138,155,192,0.1)'}`,
                }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: '#E8614B', color: '#FFFFFF' }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold" style={{ color: '#FFFFFF' }}>{tier.name}</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold" style={{ color: tier.color }}>
                      ${tier.price}
                    </span>
                    <span className="text-xs ml-1" style={{ color: '#8A9BC0' }}>/mo</span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#8A9BC0' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tier.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
