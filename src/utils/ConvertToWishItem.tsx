
import {type Products } from "../contexts/ProductsContext"
import type { WishItem } from "../contexts/WishListContext"

export const ConvertToWishItem = (product: Products) : WishItem => {
  return (
    {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]
    }
  )
}
