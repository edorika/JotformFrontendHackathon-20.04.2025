"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductFilters from "@/components/layout/ProductFilters"
import ProductCard from "@/components/layout/ProductCard"
import CheckoutDialog from "@/components/layout/CheckoutDialog"

export default function App() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("featured")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const products = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: 149.99,
      description: "Elegant minimalist watch with leather strap. Perfect for any occasion.",
      category: "accessories",
      image: "https://placehold.co/300x300",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 89.99,
      description: "High-quality wireless earbuds with noise cancellation and long battery life.",
      category: "electronics",
      image: "https://placehold.co/300x300",
    },
    {
      id: 3,
      name: "Cotton T-Shirt",
      price: 29.99,
      description: "Soft and comfortable cotton t-shirt, available in multiple colors.",
      category: "clothing",
      image: "https://placehold.co/300x300",
    },
    {
      id: 4,
      name: "Ceramic Mug",
      price: 19.99,
      description: "Handcrafted ceramic mug, perfect for your morning coffee or tea.",
      category: "home",
      image: "https://placehold.co/300x300",
    },
    {
      id: 5,
      name: "Leather Wallet",
      price: 59.99,
      description: "Genuine leather wallet with multiple card slots and coin pocket.",
      category: "accessories",
      image: "https://placehold.co/300x300",
    },
    {
      id: 6,
      name: "Notebook Set",
      price: 24.99,
      description: "Set of 3 premium notebooks with different paper types.",
      category: "stationery",
      image: "https://placehold.co/300x300",
    },
    {
      id: 7,
      name: "Scented Candle",
      price: 34.99,
      description: "Long-lasting scented candle made with natural ingredients.",
      category: "home",
      image: "https://placehold.co/300x300",
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      price: 79.99,
      description: "Portable Bluetooth speaker with 20 hours of battery life.",
      category: "electronics",
      image: "https://placehold.co/300x300",
    },
  ]

  const categories = ["all", ...new Set(products.map((p) => p.category))]

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const sortedProducts = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case "price-asc": return a.price - b.price
      case "price-desc": return b.price - a.price
      case "name-asc": return a.name.localeCompare(b.name)
      case "name-desc": return b.name.localeCompare(a.name)
      default: return 0
    }
  })

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      return existing
        ? prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return
    setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantity: newQty } : item))
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to ShopSmart</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover our curated collection of high-quality products at affordable prices.
        </p>
        <button
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-black text-white px-6 py-3 rounded-md"
        >
          Shop Now
        </button>
      </section>

      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>

          <ProductFilters
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("all") }} className="mt-4 border px-4 py-2 rounded-md">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        setIsOpen={setIsCheckoutOpen}
        cart={cart}
        cartTotal={cartTotal}
      />

      <Footer />
    </main>
  )
}