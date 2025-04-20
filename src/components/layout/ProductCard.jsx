import { Card, CardContent } from "@/components/ui/card"
import ProductDialog from "./ProductDialog"

export default function ProductCard({ product, addToCart }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <ProductDialog product={product} addToCart={addToCart}>
        <div className="cursor-pointer">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <CardContent className="p-4">
            <h3 className="font-medium">{product.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
            </div>
          </CardContent>
        </div>
      </ProductDialog>
    </Card>
  )
}