import { RandomProducts } from '../components/home/RandomProducts'
import { Header } from '../components/home/Header'
import { PageWrapper } from '../utils/PageWrapper'
import { RandomProductsByCategory } from '../components/home/RandomProductsByCategory'

export const Home = () => {
  return (
    <PageWrapper>
      <Header />
      <RandomProducts />
      <RandomProductsByCategory />
    </PageWrapper>
  )
}
