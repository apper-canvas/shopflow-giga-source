import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon = null, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-primary-600 border-2 border-primary-200 hover:border-primary-500 focus:ring-primary-500 shadow-md hover:shadow-lg',
    outline: 'bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-500'
  }
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }
  
  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  }
  
  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && (
        <motion.div
          className={`${iconSizes[size]} mr-2`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Loader2" className="w-full h-full" />
        </motion.div>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} className={`${iconSizes[size]} mr-2`} />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} className={`${iconSizes[size]} ml-2`} />
      )}
    </motion.button>
  )
}

export default Button