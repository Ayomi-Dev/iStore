// import { Link } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductsContext'
import { PageWrapper } from '../utils/PageWrapper'
import { ProductCard } from '../components/ProductCard'






export const ProductsList = () => {
  const { filteredProducts, allProducts, loading, error} = useProductContext();
  const productsOnDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts
  
  return (
    <PageWrapper>
      {/* <FilterNav /> */}
      {loading ? (
        <div className="mt-[100px] w-full h-[500px] flex items-center justify-center">Loading...</div>
      )
      : error ? (
 
        <div className="mt-[100px] w-full h-[500px] flex items-center justify-center">{error}</div>
      ) :
      (

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] w-full gap-4 p-2 ">
          {productsOnDisplay?.map((product, index) => {
            return( 
              <ProductCard key={index} product={product} />
            )
          })}
        </div>
      )
    }
    </PageWrapper>
  )
}
