import { motion } from 'framer-motion'

interface NavDotsProps {
  sections: string[]
  activeSection: number
  onDotClick: (index: number) => void
}

export function NavDots({ sections, activeSection, onDotClick }: NavDotsProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((label, i) => (
        <motion.button
          key={label}
          onClick={() => onDotClick(i)}
          whileHover={{ scale: 1.3 }}
          className="relative flex items-center justify-end group"
          title={label}
        >
          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-6 text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
            style={{ backgroundColor: '#243456', color: '#8A9BC0' }}
          >
            {label}
          </motion.span>

          <motion.div
            animate={{
              width: activeSection === i ? 24 : 8,
              backgroundColor: activeSection === i ? '#E8614B' : '#243456',
            }}
            transition={{ duration: 0.25 }}
            className="h-2 rounded-full"
          />
        </motion.button>
      ))}
    </div>
  )
}
