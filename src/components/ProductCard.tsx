import { FaEdit, FaHeart, FaStar, FaTrash } from 'react-icons/fa'
// import Img from '../assets/product.jpg'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addItems, type CartItem } from '../redux/cartSlice'
import { ConvertToCartItem } from '../utils/ConvertToCartItem'
import type{ Products } from '../contexts/ProductsContext'
import { useUserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useWishListContext } from '../contexts/WishListContext'
import { ConvertToWishItem } from '../utils/ConvertToWishItem'


interface ProductProp{
    product: Products
}

export const ProductCard: React.FC<ProductProp> = ({product}) => {
    const { user } = useUserContext()
    const {addToWishItems, isAdded, removeFromWishItems} = useWishListContext()
    const dispatch = useDispatch()
    
     const handleAddItem = (product: CartItem) => {
        dispatch(addItems({ ...product, quantity:1}))
     }
    
    const deleteProduct = async (id: string) => {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
            window.location.reload()
        } 
        catch (error) {
            console.log(error)
        }
    }

    const handleWishItem = () => {
        if(isAdded(product._id)){
            removeFromWishItems(product._id) // This function should be defined in the context to remove the item from the wish list
        }
        else{
            addToWishItems(ConvertToWishItem(product))
            // setAdded(true) // This line is not needed as we are using context to manage the state
        }
    }

  return (
        <div className="flex flex-col overflow-hidden gap-4 bg-white hover:scale-105 ease-in-out transition-all duration-300 shadow-lg rounded-md items-center">
            <Link to={`/product/${product._id}/details`}>

                <div className="py-3 px-2 flex h-40 w-40 items-center rounded-md justify-center">
                    <img src={product.images[0]} alt="" className='h-full w-full object-cover' />
                </div>
                <div className="text-center p-2">
                    <h1 className='font-bold md:text-xl text-sm'>{product.name}</h1>
                    <p className='text-[0.7rem] font-light text-sm'>{product.description.slice(0, 20)}...<span className='font-bold italic'>see more</span></p>
                    <span className='font-bold md:text-xl text-sm'>${product.price}.00</span>
                    <div className="flex justify-center text-[10px] text-gray-300">
                        <FaStar className='text-yellow-300' />
                        <FaStar className='text-yellow-300' />
                        <FaStar className='text-yellow-300' />
                        <FaStar className='text-yellow-300' />
                        <FaStar  />
                    </div>
                </div>
            </Link>
            <div className="w-full">
                
                {user?.isAdmin ? 
                    (
                        <div className="flex w-full gap-4 items-center justify-center text-white bg-[#f31b87] py-2 font-semibold rounded-b-md">
                            <Link to={`/admin/products/edit/${product._id}`}>
                                <FaEdit className='cursor-pointer hover:scale-105' />
                            </Link>
                            <FaTrash onClick={() => deleteProduct(product._id)} className='cursor-pointer hover:scale-105' />
                        </div>
                    ) :
                    (
                        <div className="flex gap-4 items-center justify-between px-2 py-2 font-semibold">
                            <div className="flex bg-[#f31b87] text-white text-[10px] md:text-xl items-center cursor-pointer px-2 rounded-md" onClick={() =>handleAddItem(ConvertToCartItem(product))}>
                                <h2>Add To Cart</h2>
                                <FaCartPlus />
                            </div>
                            <FaHeart className={`${isAdded(product._id) ? 'text-[#f31b87]' : 'text-gray-300'} cursor-pointer hover:text-[#f31b87]`} onClick={handleWishItem} />
                        </div>
                    )
            }
            </div>
        </div>
  )
}
