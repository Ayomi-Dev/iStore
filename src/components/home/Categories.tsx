import { useEffect, useState } from 'react'
import { useProductContext } from '../../contexts/ProductsContext'


export const RandomProducts = () => {
    const { allProducts } = useProductContext()
    const [randomProducts, setRandomProducts] = useState(allProducts)
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
    },[])
  return (
    <div className="w-full py-3">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 w-[90%] mx-auto">
            
            {randomProducts?.map((product, index )=> {
                return (
                    <div className="block w-full text-center shadow-md py-3 bg-white" key={index}>
                        <h1 className="text-black font-bold">{product.category}</h1>
                        <img src={product.images[0]} alt="" className='w-full h-[300px] py-2 object-cover' />
                        <div className="flex items-center justify-between px-2 w-full">
                        <button className="bg-pink-500 py-2 px-4 rounded-sm font-bold text-white">Add To Cart</button>
                        <p className="text-black font-bold text-sm">{product.name}</p>
                        <p className="text-pink-600 font-bold">${product.price}</p>
                    </div>
            </div>
                )
            })}
            

            
        </div>
    </div>
  )
}
