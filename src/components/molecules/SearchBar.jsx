import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { productService } from '@/services/api/productService'

const SearchBar = ({ className = '' }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const results = await productService.search(query)
        setSuggestions(results.slice(0, 5))
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.Id}`)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" className="w-5 h-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
        />
      </form>

      <AnimatePresence>
        {isOpen && (query.length >= 2 || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {isLoading && (
              <div className="p-4 text-center">
                <ApperIcon name="Loader2" className="w-5 h-5 animate-spin mx-auto text-slate-400" />
              </div>
            )}

            {!isLoading && suggestions.length === 0 && query.length >= 2 && (
              <div className="p-4 text-center text-slate-500">
                No products found for "{query}"
              </div>
            )}

            {!isLoading && suggestions.length > 0 && (
              <div className="py-2">
                {suggestions.map((product) => (
                  <motion.div
                    key={product.Id}
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center space-x-3"
                    onClick={() => handleSuggestionClick(product)}
                    whileHover={{ backgroundColor: '#f8fafc' }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{product.name}</h4>
                      <p className="text-sm text-slate-500">${product.price}</p>
                    </div>
                  </motion.div>
                ))}
                
                {query.trim() && (
                  <motion.div
                    className="border-t border-slate-100 px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center space-x-3"
                    onClick={handleSearch}
                    whileHover={{ backgroundColor: '#f8fafc' }}
                  >
                    <ApperIcon name="Search" className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-600">Search for "{query}"</span>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar