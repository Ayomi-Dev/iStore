// import { Link } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductsContext'
import { PageWrapper } from '../utils/PageWrapper'

import { ProductCard } from '../components/ProductCard'
import { FilterNav } from '../utils/FilterNav'
import { useEffect } from 'react'






export const ProductsList = () => {
  const { filterByCategories, filteredProducts} = useProductContext();

  useEffect(() => {
    filterByCategories("all")
  }, [])

  
  return (
    <PageWrapper>
      <FilterNav filterByCategories={filterByCategories} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] mt-[80px] gap-4 p-2 ">
        {filteredProducts?.map((product) => {
          return( 
              <ProductCard key={product._id} product={product} />
          )
        })}
      </div>
    </PageWrapper>
  )
}
