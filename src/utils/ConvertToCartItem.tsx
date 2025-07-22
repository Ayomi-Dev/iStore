import { type CartItem } from "../redux/cartSlice"
import {type Products } from "../contexts/ProductsContext"

export const ConvertToCartItem = (product: Products) : CartItem => {
  return (
    {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price,
        images: product.images
    }
  )
}
