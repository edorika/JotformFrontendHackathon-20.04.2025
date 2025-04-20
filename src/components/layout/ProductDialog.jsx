import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ProductDialog({ product, addToCart, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <img src={product.image} alt={product.name} className="rounded-md object-cover max-w-full h-auto" />
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}