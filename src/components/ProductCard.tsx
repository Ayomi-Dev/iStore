import { FaEdit, FaStar, FaTrash } from 'react-icons/fa'
// import Img from '../assets/product.jpg'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addItems, type CartItem } from '../redux/cartSlice'
import { ConvertToCartItem } from '../utils/ConvertToCartItem'
import type{ Products } from '../contexts/ProductsContext'
import { useUserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'


interface ProductProp{
    product: Products
}

export const ProductCard: React.FC<ProductProp> = ({product}) => {
    const { user } = useUserContext()
    const dispatch = useDispatch()
    
     const handleAddItem = (product: CartItem) => {
        dispatch(addItems({ ...product, quantity:1}))
     }
    
    const deleteProduct = async (id: string) => {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
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

  return (
        <div className="flex flex-col overflow-hidden gap-4 bg-white hover:scale-105 ease-in-out transition-all duration-300 shadow-lg rounded-md items-center">
            <Link to={`/product/${product._id}/details`}>

                <div className="w-full py-3 h-[150px]">
                    <img src={product.images[0]} alt="" className='w-full h-full rounded-md object-cover' />
                </div>
                <div className="text-center p-2">
                    <h1 className='font-bold'>{product.name}</h1>
                    <p className='text-[0.7rem] font-light'>{product.description.slice(0, 20)}...<span className='font-bold italic'>see more</span></p>
                    <span className='font-semibold'>${product.price}</span>
                    <div className="flex justify-center text-sm text-gray-300">
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
                            <FaEdit className='cursor-pointer hover:scale-105' />
                            <FaTrash onClick={() => deleteProduct(product._id)} className='cursor-pointer hover:scale-105' />
                        </div>
                    ) :
                    (
                        <div className="flex gap-4 items-center justify-center text-white bg-[#f31b87] py-2 font-semibold rounded-b-md" onClick={() =>handleAddItem(ConvertToCartItem(product))}>
                            <h2>Add To Cart</h2>
                            <FaCartPlus />
                        </div>
                    )
            }
            </div>
        </div>
  )
}
