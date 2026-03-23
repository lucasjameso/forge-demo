import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Lightbulb, Mail, ExternalLink, Bot } from 'lucide-react'

const ASK_CARDS = [
  {
    icon: TrendingUp,
    title: 'Investors / Partners',
    description: 'If you see the vision and want to be part of building the future of AI-powered specialty trade operations -- reach out.',
    cta: 'Reach out',
    href: 'mailto:lucas@iac-solutions.io',
    color: '#E8614B',
    tag: 'Funding & Partnership',
  },
  {
    icon: Users,
    title: 'Early Adopters (Ridgeline)',
    description: 'If you run a specialty trade operation and are tired of spreadsheets and disconnected tools -- let\'s talk. You\'ll get founder pricing.',
    cta: 'Schedule a call',
    href: 'mailto:lucas@iac-solutions.io?subject=Ridgeline Early Adopter',
    color: '#22C55E',
    tag: 'First Clients',
  },
  {
    icon: Lightbulb,
    title: 'Advisory',
    description: 'If you have built and sold a SaaS product before, raised a round, or navigated a founder exit -- I want to learn from you.',
    cta: 'Connect',
    href: 'mailto:lucas@iac-solutions.io?subject=Advisory',
    color: '#F59E0B',
    tag: 'Mentorship & Guidance',
  },
]

export function Section8TheAsk() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="section-snap min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20"
      style={{ backgroundColor: '#1B2B4B' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: '#E8614B' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#E8614B' }}>
            The Ask
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}
          >
            Here is what I am{' '}
            <span style={{ color: '#E8614B' }}>looking for.</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: '#8A9BC0' }}>
            Everything you have seen is real. The data is live. The code is shipped. The vision is clear. Now I need the right people around the table.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ASK_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-2xl flex flex-col"
                style={{
                  backgroundColor: '#243456',
                  border: `1px solid ${card.color}33`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${card.color}22` }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>

                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-md mb-3 self-start"
                  style={{ backgroundColor: `${card.color}15`, color: card.color }}
                >
                  {card.tag}
                </span>

                <h3 className="font-semibold mb-3 text-base" style={{ color: '#FFFFFF' }}>{card.title}</h3>
                <p className="text-sm flex-1 leading-relaxed mb-5" style={{ color: '#8A9BC0' }}>
                  {card.description}
                </p>

                <motion.a
                  href={card.href}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: `${card.color}22`, color: card.color, border: `1px solid ${card.color}44` }}
                >
                  <Mail size={14} />
                  {card.cta}
                  <ExternalLink size={12} />
                </motion.a>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center border-t pt-10"
          style={{ borderColor: 'rgba(138,155,192,0.1)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Bot size={16} style={{ color: '#E8614B' }} />
            <span className="text-sm font-medium" style={{ color: '#8A9BC0' }}>
              Built with Forge Console. Powered by AI agents. Made by one person.
            </span>
          </div>
          <p className="text-xs" style={{ color: '#8A9BC0' }}>
            Lucas Oliver -- IAC Solutions -- lucas@iac-solutions.io -- 2026
          </p>
        </motion.div>
      </div>
    </section>
  )
}
