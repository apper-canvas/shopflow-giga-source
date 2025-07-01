import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { useCart } from '@/hooks/useCart'

const CartSummary = ({ showCheckoutButton = true, className = '' }) => {
  const { getCartTotal, getCartCount } = useCart()
  
  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (getCartCount() === 0) {
    return null
  }

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({getCartCount()} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between text-slate-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {subtotal < 100 && (
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Truck" className="w-4 h-4 text-accent-600" />
              <span className="text-sm text-accent-700">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </span>
            </div>
          </div>
        )}
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold text-slate-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {showCheckoutButton && (
        <Button className="w-full" size="large" icon="ArrowRight" iconPosition="right">
          Proceed to Checkout
        </Button>
      )}
    </motion.div>
  )
}

export default CartSummary