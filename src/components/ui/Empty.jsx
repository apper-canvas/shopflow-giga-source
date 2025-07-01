import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'No items found', 
  message = 'Try adjusting your search or filters to find what you\'re looking for.',
  actionText = 'Browse Products',
  onAction = null,
  icon = 'Package'
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-64 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-full mb-6">
        <ApperIcon name={icon} className="w-16 h-16 text-slate-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-center mb-8 max-w-md">{message}</p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="ArrowRight" className="w-4 h-4" />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty