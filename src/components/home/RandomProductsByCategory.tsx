import { useEffect, useState } from 'react'
import { useProductContext } from '../../contexts/ProductsContext'
import {type Products } from '../../contexts/ProductsContext'


export const RandomProductsByCategory = () => {
    const {getProductsByCategory} = useProductContext()
    const [electronics, setElectronics] = useState<Products[]>([])
    const [computers, setComputers] = useState<Products[]>([])
    const [automotive, setAutomotive] = useState<Products[]>([])  
    
    useEffect(()=> {
        setElectronics(getProductsByCategory("electronics"))
        setComputers(getProductsByCategory("computers & office"))
        setAutomotive(getProductsByCategory("mobile accessories"))
    },[])


  return (
    <div className="w-full py-3">
        
            
        {electronics?.map((product, index )=> {
            return (
                <div className="block py-3 w-[90%] mx-auto">
                    <h1 className="text-center md:text-2xl py-6 font-bold">{product.category}</h1>
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 w-full">
                        <div className="block w-full text-center shadow-md py-3 bg-white" >
                            <h1 className="text-black font-bold">{product.name}</h1>
                            <img src={product.images[0]} alt="" className='w-full h-[300px] py-2 object-cover' />
                            <div className="flex items-center justify-between px-2 w-full">
                                <button className="bg-pink-500 py-2 px-4 rounded-sm font-bold text-white">Add To Cart</button>
                                <p className="text-black font-bold text-sm">{product.name}</p>
                                <p className="text-pink-600 font-bold">${product.price}</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })}

        {computers?.map((product, index )=> {
            return (
                <div className="block py-3 w-[90%] mx-auto">
                    <a href="">refresh</a>
                    <h1 className="text-center md:text-2xl py-6 font-bold">{product.category}</h1>
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 w-full">
                        <div className="block w-full text-center shadow-md py-3 bg-white" >
                            <h1 className="text-black font-bold">{product.name}</h1>
                            <img src={product.images[0]} alt="" className='w-full h-[300px] py-2 object-cover' />
                            <div className="flex items-center justify-between px-2 w-full">
                                <button className="bg-pink-500 py-2 px-4 rounded-sm font-bold text-white">Add To Cart</button>
                                <p className="text-black font-bold text-sm">{product.name}</p>
                                <p className="text-pink-600 font-bold">${product.price}</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })}

        {automotive?.map(( product, index )=> {
            return (
                <div className="block py-3 w-[90%] mx-auto">
                    <h1 className="text-center md:text-2xl py-6 font-bold">{product.category}</h1>
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 w-full">
                        <div className="block w-full text-center shadow-md py-3 bg-white" >
                            <h1 className="text-black font-bold">{product.name}</h1>
                            <img src={product.images[0]} alt="" className='w-full h-[300px] py-2 object-cover' />
                            <div className="flex items-center justify-between px-2 w-full">
                                <button className="bg-pink-500 py-2 px-4 rounded-sm font-bold text-white">Add To Cart</button>
                                <p className="text-black font-bold text-sm">{product.name}</p>
                                <p className="text-pink-600 font-bold">${product.price}</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })}
        
    </div>
  )
}
