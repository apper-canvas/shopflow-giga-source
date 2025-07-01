import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  type = 'text',
  label = '',
  placeholder = '',
  error = '',
  icon = null,
  iconPosition = 'left',
  size = 'medium',
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1'
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg'
  }
  
  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  }
  
  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
    : 'border-slate-300 focus:border-primary-500 focus:ring-primary-200'
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className={`${iconSizes[size]} text-slate-400`} />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            ${baseClasses} 
            ${sizes[size]} 
            ${stateClasses} 
            ${icon && iconPosition === 'left' ? 'pl-10' : ''} 
            ${icon && iconPosition === 'right' ? 'pr-10' : ''} 
            ${className}
          `}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className={`${iconSizes[size]} text-slate-400`} />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input