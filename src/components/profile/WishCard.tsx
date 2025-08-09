
import { FaHeartPulse } from 'react-icons/fa6'
import { useWishListContext } from '../../contexts/WishListContext'
import { Link } from 'react-router-dom'

export const WishCard = () => {
  const {wishItems} = useWishListContext()
 
  return (
    <div className="flex flex-col w-full md:w-[45%] h-[250px] items-center justify-center bg-pink-500 rounded-md shadow-md">
      <FaHeartPulse className='text-2xl' />
      <h1 className="text-white font-bold">Your Favorite Items</h1>
      <p>You have {wishItems.length} items in your wish list</p>
      <Link to={'/my-wishlist'} className='font-bold underline'>Go to wishlist</Link>
    </div>
  )
}
 