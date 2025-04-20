import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useEffect } from "react"

export default function Layout({
  children,
  cart,
  cartTotal,
  searchQuery,
  setSearchQuery,
  removeFromCart,
  updateQuantity,
  setIsCheckoutOpen,
}) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        cart={cart}
        cartTotal={cartTotal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        setIsCheckoutOpen={setIsCheckoutOpen}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}