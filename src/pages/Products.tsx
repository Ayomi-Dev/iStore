// import { Link } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductsContext'
import { PageWrapper } from '../utils/PageWrapper'
import { ProductCard } from '../components/ProductCard'
import { FilterNav } from '../utils/FilterNav'





export const ProductsList = () => {
  const { filteredProducts, allProducts, loading} = useProductContext();
  const productsOnDisplay = filteredProducts.length <= 0 ? allProducts : filteredProducts
  
  return (
    <PageWrapper>
      <FilterNav />
      {loading ? (
        <div className="mt-[100px]">Loading.....</div>
      )
      : 
      productsOnDisplay.length === 0 ? (
        <div className="mt-10">No product found</div>
      ) : (

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] mt-[80px] gap-4 p-2 ">
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
