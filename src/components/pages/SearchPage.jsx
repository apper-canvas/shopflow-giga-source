import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Grid, List, X } from 'lucide-react'
import SearchBar from '@/components/molecules/SearchBar'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    brand: ''
  })

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  useEffect(() => {
    if (query || category) {
      performSearch()
    }
  }, [query, category, filters, sortBy])

  const performSearch = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock search results - replace with actual search API
      const mockProducts = [
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 299.99,
          originalPrice: 399.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
          rating: 4.8,
          reviews: 245,
          inStock: true,
          brand: 'AudioTech',
          category: 'Electronics'
        },
        {
          id: 2,
          name: 'Smart Watch Series 5',
          price: 399.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
          rating: 4.6,
          reviews: 189,
          inStock: true,
          brand: 'TechCorp',
          category: 'Electronics'
        },
        {
          id: 3,
          name: 'Laptop Pro 16"',
          price: 1299.99,
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
          rating: 4.9,
          reviews: 156,
          inStock: true,
          brand: 'CompuTech',
          category: 'Electronics'
        },
        {
          id: 4,
          name: 'Bluetooth Speaker',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
          rating: 4.3,
          reviews: 92,
          inStock: false,
          brand: 'SoundWave',
          category: 'Electronics'
        }
      ]

      // Filter based on search query
      let filteredProducts = mockProducts
      
      if (query) {
        filteredProducts = mockProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
      }

      if (category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category.toLowerCase() === category.toLowerCase()
        )
      }

      // Apply additional filters
      filteredProducts = filteredProducts.filter(product => {
        const matchesCategory = !filters.category || product.category === filters.category
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        const matchesRating = product.rating >= filters.rating
        const matchesStock = !filters.inStock || product.inStock
        const matchesBrand = !filters.brand || product.brand === filters.brand
        
        return matchesCategory && matchesPrice && matchesRating && matchesStock && matchesBrand
      })

      // Sort products
      filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'rating':
            return b.rating - a.rating
          case 'name':
            return a.name.localeCompare(b.name)
          case 'relevance':
          default:
            return 0
        }
      })

      setProducts(filteredProducts)
    } catch (error) {
      console.error('Search error:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchQuery) => {
    setSearchParams({ q: searchQuery })
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
      brand: ''
    })
  }

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 1000
    return value !== '' && value !== 0 && value !== false
  }).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for products..."
              defaultValue={query}
            />
          </div>
          
          {(query || category) && (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {query ? `Search results for "${query}"` : `Category: ${category}`}
              </h1>
              <p className="text-gray-600">
                {loading ? 'Searching...' : `${products.length} products found`}
              </p>
            </div>
          )}
        </div>

        {/* Filters and Results */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home & Garden</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange[1]]
                    }))}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)]
                    }))}
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                >
                  <option value={0}>Any rating</option>
                  <option value={4}>4+ stars</option>
                  <option value={3}>3+ stars</option>
                  <option value={2}>2+ stars</option>
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                >
                  <option value="">All Brands</option>
                  <option value="AudioTech">AudioTech</option>
                  <option value="TechCorp">TechCorp</option>
                  <option value="CompuTech">CompuTech</option>
                  <option value="SoundWave">SoundWave</option>
                </select>
              </div>

              {/* In Stock Filter */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                  />
                  <span className="ml-2 text-sm text-gray-700">In stock only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <Empty
                icon={Search}
                title="No products found"
                message={query || category ? "Try adjusting your search or filters" : "Start searching for products"}
              />
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage