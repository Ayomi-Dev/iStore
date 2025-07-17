import { Link } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductsContext'
import { PageWrapper } from '../utils/PageWrapper'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addItems, type CartItem } from '../redux/cartSlice'
import { ConvertToCartItem } from '../utils/ConvertToCartItem'
import { useSelector } from 'react-redux'
import {type RootState } from '../redux/store'


export const ProductsList = () => {
 const { allProducts } = useProductContext()
 const dispatch = useDispatch()
 const  cartItems  = useSelector((state: RootState) => state.cart.cartItems)

 const handleAddItem = (product: CartItem) => {
    dispatch(addItems({ ...product, quantity:1}))
    console.log(cartItems)
 }

  return (
    <PageWrapper>
      <div className="flex gap-2 py-2">
        {allProducts?.map((product, index) => {
          return( 
              <div key={index} className="bg-gray-50" >
                <Link to={`/product/${product._id}`}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <span>{product.price}</span>
                    <span>{product.category}</span>
                </Link>
                  <FaCartPlus onClick={() =>handleAddItem(ConvertToCartItem(product))} />
              </div>
            
          )
        })}
      </div>
    </PageWrapper>
  )
}
