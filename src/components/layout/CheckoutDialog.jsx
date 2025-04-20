import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function CheckoutDialog({ isOpen, setIsOpen, cart, cartTotal }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="max-h-60 overflow-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-2 py-2 border-b">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover" />
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
            {/* Simplified Checkout Form */}
            <input className="border rounded-md px-3 py-2" placeholder="Full Name" />
            <input className="border rounded-md px-3 py-2" placeholder="Email" type="email" />
            <input className="border rounded-md px-3 py-2" placeholder="Address" />
            <input className="border rounded-md px-3 py-2" placeholder="Card Number" />
            <div className="grid grid-cols-2 gap-2">
              <input className="border rounded-md px-3 py-2" placeholder="MM/YY" />
              <input className="border rounded-md px-3 py-2" placeholder="CVV" />
            </div>
          </div>

          <Button className="w-full" onClick={() => alert("Order placed successfully!")}>
            Place Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}