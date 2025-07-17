import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductsContext"
import { PageWrapper } from "../utils/PageWrapper";


export const ProductDetails = () => {
    const { allProducts } = useProductContext();
    const { id } = useParams()
    const currentProduct = allProducts?.find(product => product._id === id)
    console.log(currentProduct)

  return (
    <PageWrapper>
        {currentProduct && (
            <p>{currentProduct.name}</p>
        )}
    </PageWrapper>
  )
}
