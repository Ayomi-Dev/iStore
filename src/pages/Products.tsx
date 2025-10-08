// import { Link } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductsContext'
import { PageWrapper } from '../utils/PageWrapper'
import { ProductCard } from '../components/ProductCard'
import { useEffect, useState } from 'react';
import LoadingOverlay from '../utils/LoadingOverlay';


export const ProductsList = () => {
  const { filteredProducts, allProducts, loading, error} = useProductContext();
  const [productsOnDisplay, setProductsOnDisplay] = useState(allProducts);

  useEffect(() => {
    setProductsOnDisplay(filteredProducts.length > 0 ? filteredProducts : allProducts)
  }, [allProducts, filteredProducts])
  
  
  return (
    <PageWrapper>
      {loading ? (
        <LoadingOverlay show={loading} message='Please wait while products load' />
      )
      : error ? (
 
        <div className=" w-full h-[500px] flex items-center justify-center font-bold text-2xl">{error}!</div>
      ) :
      (

        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] w-full gap-4 p-2 ">
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
