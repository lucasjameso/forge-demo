import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'

const ACCESS_CODE = 'FORGE2026'
const STORAGE_KEY = 'forge_demo_access'
const EXPIRY_HOURS = 24

interface AccessGateProps {
  children: React.ReactNode
}

function isAccessValid(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return false
    const { ts } = JSON.parse(stored) as { ts: number }
    return Date.now() - ts < EXPIRY_HOURS * 60 * 60 * 1000
  } catch {
    return false
  }
}

function grantAccess() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }))
}

export function AccessGate({ children }: AccessGateProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isAccessValid()) setUnlocked(true)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      grantAccess()
      setUnlocked(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: '#111B30' }}
        >
          {/* Mesh background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: '#E8614B' }}
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
              style={{ backgroundColor: '#1B2B4B' }}
            />
          </div>

          <div className="relative z-10 w-full max-w-md mx-auto px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8"
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                style={{ backgroundColor: '#243456' }}
              >
                <Lock size={24} style={{ color: '#E8614B' }} />
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Forge Demo
              </h1>
              <p className="text-base" style={{ color: '#8A9BC0' }}>
                Private investor preview. Enter access code to continue.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={e => { setCode(e.target.value); setError(false) }}
                  placeholder="Access code"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl text-center text-lg font-mono tracking-widest outline-none transition-all duration-200"
                  style={{
                    backgroundColor: '#243456',
                    color: '#FFFFFF',
                    border: error ? '1.5px solid #EF4444' : '1.5px solid transparent',
                    caretColor: '#E8614B',
                  }}
                  onFocus={e => {
                    if (!error) e.target.style.borderColor = '#E8614B'
                  }}
                  onBlur={e => {
                    if (!error) e.target.style.borderColor = 'transparent'
                  }}
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm mt-2 text-center"
                      style={{ color: '#EF4444' }}
                    >
                      Invalid access code
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-colors duration-200"
                style={{ backgroundColor: '#E8614B', color: '#FFFFFF' }}
              >
                Enter Demo
                <ArrowRight size={18} />
              </motion.button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-xs mt-8"
              style={{ color: '#8A9BC0' }}
            >
              Built by Lucas Oliver -- IAC Solutions -- 2026
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
