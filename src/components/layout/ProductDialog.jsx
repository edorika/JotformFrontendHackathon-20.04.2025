import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProductDialog({ product, addToCart, children }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = () => {
    addToCart(product, quantity);
    setQuantity(1); // reset for next time
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-md object-cover max-w-full h-auto"
            />
          </div>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center gap-4 justify-between">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>

            <div className="flex items-center border rounded px-3 py-1 gap-2">
              <button onClick={decrease} className="text-lg px-2">−</button>
              <span>{quantity}</span>
              <button onClick={increase} className="text-lg px-2">+</button>
            </div>

            <Button onClick={handleAdd}>Add {quantity} to Cart</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}