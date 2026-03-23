import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bot, Clock, Cpu, X } from 'lucide-react'
import { useAgents, useAgentSessions } from '@/hooks/useSupabaseStats'
import { SkeletonBlock } from '@/components/SkeletonBlock'
import { formatDistanceToNow } from 'date-fns'
import type { Agent } from '@/lib/types'

const MODEL_COLORS: Record<string, string> = {
  'claude-sonnet-4-6': '#E8614B',
  'claude-opus-4-6': '#8A9BC0',
  'claude-haiku-4-5-20251001': '#22C55E',
}

function modelLabel(model: string): string {
  if (model.includes('opus')) return 'Opus'
  if (model.includes('sonnet')) return 'Sonnet'
  if (model.includes('haiku')) return 'Haiku'
  return model
}

function modelColor(model: string): string {
  return MODEL_COLORS[model] ?? '#8A9BC0'
}

function AgentCard({ agent, index, onClick }: { agent: Agent; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onClick}
      className="p-4 rounded-2xl cursor-pointer"
      style={{
        backgroundColor: '#243456',
        border: `1px solid ${agent.is_active ? 'rgba(232,97,75,0.2)' : 'rgba(138,155,192,0.1)'}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: agent.is_active ? 'rgba(232,97,75,0.15)' : 'rgba(138,155,192,0.1)' }}
        >
          <Bot size={16} style={{ color: agent.is_active ? '#E8614B' : '#8A9BC0' }} />
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: agent.is_active ? '#22C55E' : '#8A9BC0' }}
          />
          <span className="text-xs" style={{ color: agent.is_active ? '#22C55E' : '#8A9BC0' }}>
            {agent.is_active ? 'Active' : 'Paused'}
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-1" style={{ color: '#FFFFFF' }}>{agent.name}</h3>
      {agent.description && (
        <p className="text-xs line-clamp-2 mb-3" style={{ color: '#8A9BC0' }}>{agent.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span
          className="text-xs px-2 py-0.5 rounded-md font-medium"
          style={{ backgroundColor: `${modelColor(agent.model)}22`, color: modelColor(agent.model) }}
        >
          {modelLabel(agent.model)}
        </span>
        {agent.schedule && (
          <div className="flex items-center gap-1">
            <Clock size={10} style={{ color: '#8A9BC0' }} />
            <span className="text-xs" style={{ color: '#8A9BC0' }}>{agent.schedule}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const { data: sessions } = useAgentSessions(agent.id)
  const lastSession = sessions?.[0]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(17,27,48,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg p-6 rounded-2xl"
        style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(232,97,75,0.15)' }}>
              <Bot size={18} style={{ color: '#E8614B' }} />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>{agent.name}</h3>
              <p className="text-xs" style={{ color: '#8A9BC0' }}>{agent.slug}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#1B2B4B', border: 'none', cursor: 'pointer' }}
          >
            <X size={14} style={{ color: '#8A9BC0' }} />
          </button>
        </div>

        {agent.description && (
          <p className="text-sm mb-5" style={{ color: '#8A9BC0' }}>{agent.description}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl" style={{ backgroundColor: '#1B2B4B' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Cpu size={12} style={{ color: '#8A9BC0' }} />
              <span className="text-xs" style={{ color: '#8A9BC0' }}>Model</span>
            </div>
            <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{modelLabel(agent.model)}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: '#1B2B4B' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={12} style={{ color: '#8A9BC0' }} />
              <span className="text-xs" style={{ color: '#8A9BC0' }}>Schedule</span>
            </div>
            <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{agent.schedule ?? 'On demand'}</p>
          </div>
        </div>

        {lastSession ? (
          <div className="p-4 rounded-xl" style={{ backgroundColor: '#1B2B4B' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#E8614B' }}>Last Run</p>
            <p className="text-xs mb-1" style={{ color: '#8A9BC0' }}>
              {formatDistanceToNow(new Date(lastSession.started_at), { addSuffix: true })}
            </p>
            {lastSession.output_summary && (
              <p className="text-sm" style={{ color: '#FFFFFF' }}>{lastSession.output_summary}</p>
            )}
            {lastSession.estimated_cost_usd !== null && (
              <p className="text-xs mt-2" style={{ color: '#8A9BC0' }}>
                Est. cost: ${lastSession.estimated_cost_usd.toFixed(4)}
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: '#1B2B4B' }}>
            <p className="text-sm" style={{ color: '#8A9BC0' }}>No sessions logged yet</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function Section4Agents() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { data: agents, isLoading } = useAgents()
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

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
            Agent Architecture
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}
          >
            8 AI agents running autonomously.{' '}
            <span style={{ color: '#E8614B' }}>This is the team.</span>
          </h2>
          <p className="text-sm" style={{ color: '#8A9BC0' }}>Click any agent to see its last output.</p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonBlock key={i} className="h-36" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(agents ?? []).map((agent, i) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                index={i}
                onClick={() => setSelectedAgent(agent)}
              />
            ))}
          </div>
        )}

        {/* Model legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          {[
            { color: '#E8614B', label: 'Sonnet -- daily workhorses' },
            { color: '#8A9BC0', label: 'Opus -- deep architecture' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs" style={{ color: '#8A9BC0' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedAgent && (
          <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
