import { ShoppingCart, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import CartSheet from "./CartSheet"

export default function Header({ cart,
                                cartTotal,
                                setSearchQuery,
                                searchQuery,
                                removeFromCart,
                                updateQuantity,
                                setIsCheckoutOpen }) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">ShopSmart</h1>
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
        <CartSheet
          cart={cart}
          cartTotal={cartTotal}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          setIsCheckoutOpen={setIsCheckoutOpen}
        />
      </div>
    </header>
  )
}