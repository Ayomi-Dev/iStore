import { RandomProducts } from '../components/home/Categories'
import { Header } from '../components/home/Header'
import { PageWrapper } from '../utils/PageWrapper'

export const Home = () => {
  return (
    <PageWrapper>
      <Header />
      <RandomProducts />
    </PageWrapper>
  )
}
