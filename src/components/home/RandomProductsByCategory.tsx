import { useEffect, useState } from 'react'
import { useProductContext } from '../../contexts/ProductsContext'
import {type Products } from '../../contexts/ProductsContext'
import { useDispatch } from 'react-redux'
import { addItems } from '../../redux/cartSlice'
import { ConvertToCartItem } from '../../utils/ConvertToCartItem'
import { Link, useNavigate } from 'react-router-dom'


export const RandomProductsByCategory = () => {
    const {getProductsByCategory, allProducts, selectedCategoryProducts} = useProductContext()
    const [electronics, setElectronics] = useState<Products[]>([]);
    const [computers, setComputers] = useState<Products[]>([]);
    const [automotive, setAutomotive] = useState<Products[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=> {
        setElectronics(getProductsByCategory("Electronics"))
        setComputers(getProductsByCategory("Computers & Office"))
        setAutomotive(getProductsByCategory("Mobile Accessories"))
    },[allProducts])

    const handleCategory = (category: string) => {
        selectedCategoryProducts(category);
        navigate(`/products/${category}`)
    }


  return (
    <div className="w-full py-3">
        <h1 className="text-center text-2xl font-semibold pt-3" onClick={()=> handleCategory("electronics")}>Electronics</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-3">
            {electronics?.map((product, index )=> {
                return (
                    <div key={index} className="flex flex-col justify-between items-center text-center shadow-md py-3 bg-white" >
                        <Link to={`/product/${product._id}/details`}>
                            <img src={product.images[0]} alt="" className='w-full px-2 min-h-[100px] py-2 object-cover' />
                        </Link>
                        <div className="flex items-center flex-wrap justify-between px-2 w-full">
                            <button className="bg-pink-500 py-2 px-4 text-[10px] rounded-sm font-bold text-white cursor-pointer" onClick={() => dispatch(addItems(ConvertToCartItem(product)))}>Add To Cart</button>
                            <p className="text-black font-bold text-sm">{product.name}</p>
                            <p className="text-pink-600 font-bold">${product.price}.00</p>
                        </div>
                    </div>
                )
            })}
        </div>  

        <h1 className="text-center text-2xl font-semibold pt-3" onClick={()=> handleCategory("automotive")}>Automotive</h1>
        <div className="grid grid-cols-2  md:grid-cols-3 gap-3 my-3">
            {automotive?.map((product, index )=> {
                return (
                    <div key={index} className="flex flex-col justify-between items-center text-center shadow-md py-3 bg-white" >
                        <Link to={`/product/${product._id}/details`}>
                            <img src={product.images[0]} alt="" className='w-full px-2 min-h-[100px] py-2 object-cover' />
                        </Link>
                        <div className="flex items-center flex-wrap justify-between px-2 w-full">
                            <button className="bg-pink-500 py-2 px-4 text-[10px] rounded-sm font-bold text-white cursor-pointer" onClick={() => dispatch(addItems(ConvertToCartItem(product)))}>Add To Cart</button>
                            <p className="text-black font-bold text-sm">{product.name}</p>
                            <p className="text-pink-600 font-bold">${product.price}.00</p>
                        </div>
                    </div>   
                )
            })}
        </div>


        <h1 className="text-center text-2xl font-semibold pt-3" onClick={() => handleCategory("computers & office")}>Computers & Office</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-3">
            {computers?.map((product, index )=> {
                return ( 

                    <div key={index} className="flex flex-col items-center justify-center  text-center shadow-md py-3 bg-white" >
                        <Link to={`/product/${product._id}/details`}>
                            <img src={product.images[0]} alt="" className='w-full px-2 min-h-[100px] py-2 object-cover' />
                        </Link>
                        <div className="flex items-center flex-wrap justify-between px-2 w-full">
                            <button className="bg-pink-500 py-2 px-4 text-[10px] rounded-sm font-bold text-white cursor-pointer" onClick={() => dispatch(addItems(ConvertToCartItem(product)))}>Add To Cart</button>
                            <p className="text-black font-bold text-sm">{product.name}</p>
                            <p className="text-pink-600 font-bold">${product.price}.00</p>
                        </div>
                    </div>
                    
                )
            })}
        </div>

       
        
    </div>
  )
}
