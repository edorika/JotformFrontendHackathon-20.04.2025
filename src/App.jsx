"use client"

import { useState } from "react"
import { ShoppingCart, X, Plus, Minus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function App() {
  // Products data
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

  // State management
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [sortOption, setSortOption] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  // Get unique categories
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  // Filter products by category and search query
  const filteredProducts = products.filter((product) => {
    // Filter by category
    const categoryMatch = activeCategory === "all" || product.category === activeCategory

    // Filter by search query
    const searchMatch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    return categoryMatch && searchMatch
  })

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0 // "featured" or default sorting
    }
  })

  // Cart functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold">ShopSmart</h1>

          {/* Search Bar */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[70vh]">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto py-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" onClick={() => setIsCheckoutOpen(true)}>
                        Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to ShopSmart</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of high-quality products at affordable prices.
          </p>
          <Button size="lg" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
            Shop Now
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            {/* Category Dropdown */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Category:</span>
              <select
                className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="capitalize">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
                          </div>
                        </CardContent>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-center">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="rounded-md object-cover max-w-full h-auto"
                          />
                        </div>
                        <p className="text-muted-foreground">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="max-h-60 overflow-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-2 py-2 border-b">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-1">
                  <label htmlFor="firstName" className="text-sm">
                    First Name
                  </label>
                  <input id="firstName" className="border rounded-md px-3 py-2" placeholder="John" />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="lastName" className="text-sm">
                    Last Name
                  </label>
                  <input id="lastName" className="border rounded-md px-3 py-2" placeholder="Doe" />
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border rounded-md px-3 py-2"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="address" className="text-sm">
                  Address
                </label>
                <input id="address" className="border rounded-md px-3 py-2" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-1">
                  <label htmlFor="city" className="text-sm">
                    City
                  </label>
                  <input id="city" className="border rounded-md px-3 py-2" placeholder="New York" />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="zipCode" className="text-sm">
                    Zip Code
                  </label>
                  <input id="zipCode" className="border rounded-md px-3 py-2" placeholder="10001" />
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="cardNumber" className="text-sm">
                  Card Number
                </label>
                <input id="cardNumber" className="border rounded-md px-3 py-2" placeholder="**** **** **** ****" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-1">
                  <label htmlFor="expDate" className="text-sm">
                    Expiration Date
                  </label>
                  <input id="expDate" className="border rounded-md px-3 py-2" placeholder="MM/YY" />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="cvv" className="text-sm">
                    CVV
                  </label>
                  <input id="cvv" className="border rounded-md px-3 py-2" placeholder="123" />
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={() => alert("Order placed successfully!")}>
              Place Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopSmart</h3>
              <p className="text-gray-400">Your one-stop shop for high-quality products at affordable prices.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                123 Shop Street
                <br />
                Retail City, RC 10001
                <br />
                Email: info@shopsmart.com
                <br />
                Phone: (123) 456-7890
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}