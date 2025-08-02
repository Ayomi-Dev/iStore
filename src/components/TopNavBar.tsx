import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaBars, FaHome, FaPlusCircle, FaPowerOff, FaShopify, FaSignInAlt, FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { Username } from '../utils/Username'
import { useUserContext } from '../contexts/UserContext'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { FilterNav } from '../utils/FilterNav'




export const TopNavBar = () => {
  const {user, logout, openSidePanel, sidePanel} = useUserContext()
  const navigate = useNavigate()
  const {cartItems} = useSelector((state: RootState) => state.cart)

  

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <section className='w-full flex-col flex items-center justify-center sticky px-1 md:px-4 z-90 top-0 left-0 h-[120px] bg-gray-50'> 
      <nav className='mx-3 py-3 w-full flex justify-between relativeitems-center'>
    {/* <a href="">Reload</a> */}
        <div className="flex h-full items-center gap-4">
          {user?.isAdmin 
          ?
          (
            <Link to={`admin/dashboard`} className='flex gap-2 items-center justify-center font-bold' title='home'>
                <FaHome />
                <span>Dashboard</span>
            </Link>
              
          )
          
          
          : 
          (<>
          
            <div className="block z-10 cursor-pointer" onClick={openSidePanel}>
              {sidePanel ? (
                <FaArrowLeft />
              ) : (
                <FaBars  />
              )}
            </div>
            <h1 className='md:ml-4 ml-1 font-bold italic hidden md:block text-sm md:text-xl text-pink-600'>iStore</h1>
          </>)
          
        }
        </div>

        <Username  />
        
        {/* <SearchBar toggleSearchBar={toggleSearchBar} displaySearchBar={displaySearchBar} /> */}
        
        <div className="h-full relative flex gap-2 items-center">
          {/* <FaSearch className="block md:hidden mx-1 text-xs md:text-lg" onClick={displaySearchBar} /> */}
          <div className="relative">
            {user?.isAdmin ? 
              ( <div className="flex">
                <Link to='/admin/add-new-product' >
                  <FaPlusCircle className="mx-1 text-xs md:text-lg " title='add product'/>
                </Link>

                <Link to={'/admin/products'}>
                  <FaShopify className="mx-1 text-xs md:text-lg " title='see all products'/>
                </Link>
              </div>
              ) :
              (<div className="relative flex gap-2">
                 <Link to={'/products'}>
                  <FaShopify className="mx-1 text-xs md:text-lg " title='see all products'/>
                </Link>
                <Link to='/cart'>
                  <FaCartShopping className="mx-1 text-xs md:text-lg " title='go to cart'/>
                  <span className="top-[-20px] right-[0] text-2xl font-bold text-pink-600 absolute">{cartItems.length == 0 ? '' : cartItems.length}</span>
                </Link>
              </div>
              )
            }
          </div>
          

          <Link to={`/profile`} >
            <FaUser className="mx-1 text-xs md:text-lg" title='profile' />
          </Link>
          
          {user ? (
            
            <FaPowerOff className="mx-1 text-xs md:text-lg cursor-pointer " title='logout' onClick={handleLogout} />
            
          ) :
          (
            <Link to='/login'>
              <FaSignInAlt className="mx-1 text-xs md:text-lg" title='login' />
            </Link>
          )
        
          }

          


        </div>
      </nav>
      <FilterNav />
    </section>
  )
}
