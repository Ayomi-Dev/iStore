
import { PageWrapper } from '../../utils/PageWrapper'
import { EditProductForm } from '../components/EditProductForm'

export const EditProduct = () => {
  return (
    <PageWrapper>
        <h1 className='text-center text-2xl font-bold py-3'>Edit Product</h1>
        <EditProductForm />
    </PageWrapper>
  )
}
