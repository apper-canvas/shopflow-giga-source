import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopflow-cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopflow-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setIsLoading(true)
    
    setTimeout(() => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === product.Id)
        
        if (existingItem) {
          const updatedItems = prevItems.map(item =>
            item.productId === product.Id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
          toast.success(`Updated ${product.name} quantity in cart`)
          return updatedItems
        } else {
          const newItem = {
            productId: product.Id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
          }
          toast.success(`Added ${product.name} to cart`)
          return [...prevItems, newItem]
        }
      })
      setIsLoading(false)
    }, 300)
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.productId === productId)
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.name} from cart`)
      }
      return prevItems.filter(item => item.productId !== productId)
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    toast.info('Cart cleared')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }
}