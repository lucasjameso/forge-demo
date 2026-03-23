import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FolderOpen, CheckSquare, Activity, AlertCircle } from 'lucide-react'
import { useProjects, useProjectActionItems, useActivityLog } from '@/hooks/useSupabaseStats'
import { SkeletonBlock } from '@/components/SkeletonBlock'
import { formatDistanceToNow } from 'date-fns'

const STATUS_COLORS: Record<string, string> = {
  active: '#22C55E',
  in_progress: '#22C55E',
  planning: '#F59E0B',
  complete: '#8A9BC0',
  completed: '#8A9BC0',
  paused: '#EF4444',
  default: '#8A9BC0',
}

function statusColor(status: string) {
  return STATUS_COLORS[status] ?? STATUS_COLORS.default
}

export function Section3ForgeTour() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { data: projects, isLoading: loadingProjects } = useProjects()
  const { data: actionItems, isLoading: loadingItems } = useProjectActionItems()
  const { data: activity, isLoading: loadingActivity } = useActivityLog()

  return (
    <section
      ref={ref}
      className="section-snap min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20"
      style={{ backgroundColor: '#111B30' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #243456 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#E8614B' }}>
            Forge Console Tour
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}
          >
            One system.{' '}
            <span style={{ color: '#E8614B' }}>Everything in it. Nothing dropped.</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            This is real data. Right now.
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-2xl p-5"
            style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen size={16} style={{ color: '#E8614B' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Active Projects</span>
            </div>
            <div className="space-y-3">
              {loadingProjects ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-10" />)
              ) : (projects ?? []).slice(0, 6).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: statusColor(project.status) }}
                  />
                  <span className="text-sm truncate flex-1" style={{ color: '#FFFFFF' }}>{project.name}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md capitalize"
                    style={{ backgroundColor: `${statusColor(project.status)}22`, color: statusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </motion.div>
              ))}
              {!loadingProjects && (projects ?? []).length === 0 && (
                <p className="text-sm" style={{ color: '#8A9BC0' }}>No projects found</p>
              )}
            </div>
          </motion.div>

          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="rounded-2xl p-5"
            style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={16} style={{ color: '#F59E0B' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Action Items</span>
            </div>
            <div className="space-y-3">
              {loadingItems ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-10" />)
              ) : (actionItems ?? []).slice(0, 5).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-2"
                >
                  <CheckSquare size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#8A9BC0' }} />
                  <span className="text-sm leading-tight" style={{ color: '#FFFFFF' }}>{item.title}</span>
                </motion.div>
              ))}
              {!loadingItems && (actionItems ?? []).length === 0 && (
                <p className="text-sm" style={{ color: '#8A9BC0' }}>No action items</p>
              )}
            </div>
          </motion.div>

          {/* Activity Log */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="rounded-2xl p-5"
            style={{ backgroundColor: '#243456', border: '1px solid rgba(138,155,192,0.1)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} style={{ color: '#22C55E' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Recent Activity</span>
            </div>
            <div className="space-y-3">
              {loadingActivity ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-12" />)
              ) : (activity ?? []).slice(0, 5).map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.07 }}
                  className="border-l-2 pl-3"
                  style={{ borderColor: '#E8614B33' }}
                >
                  <p className="text-xs font-medium" style={{ color: '#FFFFFF' }}>{log.action}</p>
                  {log.description && (
                    <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#8A9BC0' }}>{log.description}</p>
                  )}
                  <p className="text-xs mt-0.5" style={{ color: '#8A9BC0' }}>
                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                  </p>
                </motion.div>
              ))}
              {!loadingActivity && (activity ?? []).length === 0 && (
                <p className="text-sm" style={{ color: '#8A9BC0' }}>No recent activity</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
