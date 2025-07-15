
import { LoginForm } from '../components/LoginForm'
import { PageWrapper } from '../utils/PageWrapper'

export const Login = () => {
  return (
    <PageWrapper>

    <div className='w-[500px] flex items-center justify-center mx-auto'>
      <LoginForm />
    </div>
    </PageWrapper>
  )
}
