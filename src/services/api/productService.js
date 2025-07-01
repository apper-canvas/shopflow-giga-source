import products from '@/services/mockData/products.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const productService = {
  async getAll() {
    await delay(300)
    return [...products]
  },

  async getById(id) {
    await delay(200)
    const product = products.find(p => p.Id === parseInt(id))
    if (!product) {
      throw new Error('Product not found')
    }
    return { ...product }
  },

  async getByCategory(categoryName) {
    await delay(400)
    const categoryProducts = products.filter(p => 
      p.category.toLowerCase() === categoryName.toLowerCase()
    )
    return categoryProducts.map(p => ({ ...p }))
  },

  async getFeatured() {
    await delay(250)
    const featuredProducts = products.filter(p => p.featured)
    return featuredProducts.map(p => ({ ...p }))
  },

  async getOnSale() {
    await delay(300)
    const saleProducts = products.filter(p => p.onSale)
    return saleProducts.map(p => ({ ...p }))
  },

  async search(query) {
    await delay(350)
    const lowercaseQuery = query.toLowerCase()
    const searchResults = products.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
    return searchResults.map(p => ({ ...p }))
  },

  async getRelated(productId, categoryName) {
    await delay(300)
    const relatedProducts = products.filter(p => 
      p.Id !== parseInt(productId) && 
      p.category.toLowerCase() === categoryName.toLowerCase()
    ).slice(0, 4)
    return relatedProducts.map(p => ({ ...p }))
  }
}