import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = 'Something went wrong', onRetry = null }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-64 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-full mb-6">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-slate-600 text-center mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error