import categories from '@/services/mockData/categories.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(200)
    return [...categories]
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async getBySlug(slug) {
    await delay(200)
    const category = categories.find(c => c.slug === slug)
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async getFeatured() {
    await delay(250)
    const featuredCategories = categories.filter(c => c.featured)
    return featuredCategories.map(c => ({ ...c }))
  }
}