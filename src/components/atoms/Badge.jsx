import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'medium',
  className = '',
  animate = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full'
  
  const variants = {
    default: 'bg-slate-100 text-slate-800',
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    outline: 'bg-transparent border-2 border-slate-300 text-slate-700'
  }
  
  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  }
  
  const BadgeComponent = (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
  
  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {BadgeComponent}
      </motion.div>
    )
  }
  
  return BadgeComponent
}

export default Badge