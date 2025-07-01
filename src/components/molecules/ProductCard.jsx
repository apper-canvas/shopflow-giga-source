import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { useCart } from '@/hooks/useCart'

const ProductCard = ({ product, className = '' }) => {
  const navigate = useNavigate()
  const { addToCart, isLoading } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
  }

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`)
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      className={`card-premium cursor-pointer overflow-hidden ${className}`}
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.onSale && discountPercentage > 0 && (
            <Badge variant="error" size="small" animate>
              {discountPercentage}% OFF
            </Badge>
          )}
          {product.featured && (
            <Badge variant="accent" size="small">
              Featured
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="Heart" className="w-5 h-5 text-slate-600" />
          </motion.button>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="error" size="large">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-slate-800 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{product.category}</p>
        </div>

        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <ApperIcon
                key={i}
                name="Star"
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-accent-400 fill-current'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-slate-800">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-slate-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <Button
            size="small"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            loading={isLoading}
            icon="Plus"
            className="shrink-0"
          >
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard