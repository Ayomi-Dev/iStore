// import { Link } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductsContext'
import { PageWrapper } from '../utils/PageWrapper'

import { ProductCard } from '../components/ProductCard'


export const ProductsList = () => {
 const { allProducts } = useProductContext()
 

  return (
    <PageWrapper>
      
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 p-3 md:p-0">
        {allProducts?.map((product) => {
          return( 
              <ProductCard key={product._id} product={product} />
          )
        })}
      </div>
    </PageWrapper>
  )
}
