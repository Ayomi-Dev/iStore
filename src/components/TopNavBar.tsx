import { Link, useNavigate } from 'react-router-dom'
import { SearchBar } from '../utils/SearchBar'
import { FaArrowLeft, FaBars, FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { Username } from '../utils/Username'
import { useUserContext } from '../contexts/UserContext'
import { useState } from 'react'




export const TopNavBar = () => {
  const {user, logout, openSidePanel, sidePanel} = useUserContext()
  const navigate = useNavigate()
  const [toggleSearchBar, setToggleSearchBar] = useState<boolean>(false)

  const displaySearchBar = () => {
    setToggleSearchBar(!toggleSearchBar)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <section className='w-full sticky px-1 md:px-4 z-30 top-0 left-0 h-[60px]'> 
      <nav className='mx-3 h-full w-full flex justify-between relative items-center'>
    <a href="">refresh</a>
        <div className="flex h-full items-center gap-4">
          <div className="block z-10 cursor-pointer" onClick={openSidePanel}>
            {sidePanel ? (
              <FaArrowLeft />
            ) : (
              <FaBars  />
            )}
          </div>
          <h1 className='md:ml-4 ml-1 font-bold italic hidden md:block text-sm md:text-xl text-pink-600'>E-Store</h1>
        </div>

        <Username  />
        
        <SearchBar toggleSearchBar={toggleSearchBar} displaySearchBar={displaySearchBar} />
        
        <div className="h-full relative flex gap-2 items-center">
          <FaSearch className="block md:hidden mx-1 text-xs md:text-lg" onClick={displaySearchBar} />
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
