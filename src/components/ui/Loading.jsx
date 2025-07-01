import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'product-grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2 animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'product-detail') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="h-96 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-4/5 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-64">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Loading