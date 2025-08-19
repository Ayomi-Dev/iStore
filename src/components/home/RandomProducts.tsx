import { useEffect, useState } from 'react'
import { useProductContext } from '../../contexts/ProductsContext'
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/cartSlice';
import { ConvertToCartItem } from '../../utils/ConvertToCartItem';
import { Link } from 'react-router-dom';


export const RandomProducts = () => {
    const { allProducts } = useProductContext()
    const [randomProducts, setRandomProducts] = useState(allProducts);
    const dispatch = useDispatch()
    
    const getRandomProducts = () => {
        const categoryMap: Record<string, any[]> = {}

        allProducts?.forEach((product) => {
            if(!categoryMap[product.category]){
                categoryMap[product.category] = []
            }
            categoryMap[product.category].push(product);
            
        })
        
        const uniqueCategories = Object.keys(categoryMap);
        if(uniqueCategories.length < 3) return

        const shuffleCategories = uniqueCategories.sort(()=> Math.random() - 0.5);
        const selectedCategories = shuffleCategories.slice(0,3);

        const selectedProducts = selectedCategories.map(category => {
            const productsInCategory = categoryMap[category]
            const randomIndex = Math.floor(Math.random() * productsInCategory.length);
            return productsInCategory[randomIndex]
        })

        setRandomProducts(selectedProducts);
    }
    useEffect(()=> {
        getRandomProducts()
    },[allProducts])
  return (
    <div className="w-full py-3">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4 w-[90%] mx-auto">
            
            {randomProducts?.map((product, index )=> {
                return (
                    <div className="flex flex-col justify-between items-center w-full text-center shadow-md py-3 bg-white" key={index}>
                        <Link to={`/products/${product.category}`} className='text-pink-500'>
                            {product.category}
                        </Link>
                        <Link to={`/product/${product._id}/details`}>
                            <img src={product.images[0]} alt="" className='w-full px-2 min-h-[100px] py-2 object-cover' />
                        </Link>
                        <div className="flex items-center flex-wrap justify-between px-2 w-full">
                            <button className="bg-pink-500 py-2 px-4 text-[12px] rounded-sm font-bold text-white cursor-pointer" onClick={() => dispatch(addItems(ConvertToCartItem(product))) }>Add To Cart</button>
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
