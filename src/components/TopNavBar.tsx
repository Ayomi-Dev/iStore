import { Link, useNavigate } from 'react-router-dom'
import { SearchBar } from '../utils/SearchBar'
import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { Username } from '../utils/Username'
import { useUserContext } from '../contexts/UserContext'

export const TopNavBar = () => {
  const {user, logout} = useUserContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <section className='w-full sticky px-1 md:px-4 z-30 top-o left-0 h-[80px] bg-white'> 
      <nav className='mx-3 h-full flex justify-between items-center'>

        <div className="flex h-full items-center gap-4">
          <FaBars className="md:hidden block z-10" />
          <h1 className='md:ml-4 ml-1 font-bold italic hidden md:block text-sm md:text-xl text-pink-600'>E-Store</h1>
        </div>

        <Username  />
        
        <SearchBar />
        
        <div className="h-full relative flex gap-2 items-center">
          <div className="relative">
            <Link to='/cart' >
              <FaCartShopping className="mx-1 text-xs md:text-lg "/>
              <span className="top-3 right-0 text-2xl font-bold absolute"></span>
            </Link>
          </div>

          <Link to={`/profile`} >
            <FaUser className="mx-1 text-xs md:text-lg" />
          </Link>
          
          {user ? (
            
            <FaSignOutAlt className="mx-1 text-xs md:text-lg " onClick={handleLogout} />
            
          ) :
          (
            <Link to='/login'>
              <FaSignInAlt className="mx-1 text-xs md:text-lg " />
            </Link>
          )
        
          }

          


        </div>
      </nav>
    </section>
  )
}
