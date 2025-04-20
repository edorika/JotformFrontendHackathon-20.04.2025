"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductFilters from "@/components/layout/ProductFilters"
import ProductCard from "@/components/layout/ProductCard"
import CheckoutDialog from "@/components/layout/CheckoutDialog"
import { getProducts } from "@/api/getProducts";

export default function App() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("featured")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState(["all"]);

  useEffect(() => {
    getProducts().then((data) => {
      const rawProducts = data.content.products;
  
      const parsedProducts = rawProducts.map((p, index) => ({
        id: p.pid ?? index,
        name: p.name,
        price: parseFloat(p.price) || 0,
        description: p.description || "No description provided.",
        categories: JSON.parse(p.connectedCategories || "[]"),
        image: (JSON.parse(p.images || "[]")[0]) || "https://placehold.co/300x300"
      }));
  
      setProducts(parsedProducts);
  
      const categorySet = new Set();
      parsedProducts.forEach(p => p.categories.forEach(c => categorySet.add(c)));
  
      setAllCategories(["all", ...Array.from(categorySet)]);
    });
  }, []);

  
  const categories = allCategories;

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

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return
    setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantity: newQty } : item))
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    console.log("🛒 Cart Total Updated:", cartTotal.toFixed(2));
  }, [cartTotal]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header cart={cart} cartTotal={cartTotal} searchQuery={searchQuery} setSearchQuery={setSearchQuery} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      
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