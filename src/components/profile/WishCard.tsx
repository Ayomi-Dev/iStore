
import { useWishListContext } from '../../contexts/WishListContext'

export const WishCard = () => {
  const {wishItems} = useWishListContext()
 
  return (
    <div className="bg-pink-400 rounded-md shadow-md p-3">
      <h1>Favorites</h1>
      <p>You have {wishItems.length} items in your wish list</p>
    </div>
  )
}
 