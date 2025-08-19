import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductsContext'
import { ProductCard } from './ProductCard'

export const Categories = () => {
    const { category } = useParams()
    const { selectedCategoryProducts, categoryProducts } = useProductContext()

    useEffect(() => {
        if (category) {
            selectedCategoryProducts(category)
        }
    }, [category]);

  return (
    <div className="w-full">
        {categoryProducts && (
            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] w-full gap-4 p-2 ">
                {categoryProducts?.map((product, index) => {
                    return( 
                        <ProductCard key={index} product={product} />
                    )
                    })}
            </div>
        )}
    </div>
  )
}
