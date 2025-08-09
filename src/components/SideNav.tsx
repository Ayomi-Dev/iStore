
import { FaCartPlus, FaClock, FaCompass, FaHeart, FaHome } from 'react-icons/fa';
import { FaGears, FaMessage, FaUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useWishListContext } from '../contexts/WishListContext';







export const SideNav = ( ) => {
  const location = useLocation()
  const { sidePanel, user } = useUserContext()
  const { wishItems } = useWishListContext()
  const activePage = (path: string) => {
    window.scrollTo(0,0)
    return location.pathname === path ? 'active' : '';
  }
 
  return (
    <>
      
      <aside className={`${sidePanel ? 'translate-x-0 ' : '-translate-x-full'} active w-[75%] fixed 
      z-[10] overflow-x-auto h-full px-4 left-0 md:w-[15%] transform transition-transform 
      duration-300 ease-in-out bg-gray-50`}>
        
        <div className="mx-auto shadow-lg rounded-[50%] my-4 w-28 h-28 mt-4">
          <img src={user?.image} className='w-full h-full rounded-full object-cover border-white border-8 shadow-md' alt="profile-photo" />
          <span className="text-pink-600 my-2 font-bold">{user?.name}</span>
        </div>

        <nav className="w-full py-3">
          <ul className="flex flex-col items-center justify-center mx-auto">
                
            <li className={`${activePage('/')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/`}>
                <div className="flex gap-2 ">
                  <FaHome className=" px-1 text-2xl"/>
                  <span>Home</span>
                </div>
              </Link>
            </li>
            
            <li className={`${activePage('/products')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/products`}>
                <div className="flex gap-2 ">
                  <FaCompass className=" px-1 text-2xl"/>
                  <span>Shop</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/my-wishlist')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/my-wishlist`} >
                <div className="gap-2  relative flex">
                  <FaHeart className=" px-1 text-2xl" />
                  <span>Wishlist</span>
                  <span className='count'>{wishItems.length}</span> 
                </div>
              </Link>
            </li>
            <li className={`${activePage('/cart')} w-full items-center p-2 shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/cart`}>
                <div className="flex gap-2 ">
                  <FaCartPlus className=" px-1 text-2xl" />
                  <span>Cart</span>
                  {/* <span className='count'>{cartItems.length}</span> */}
                </div>
              </Link>
            </li>
            <li className={`${activePage('/profile')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/profile`} >
                <div className="flex gap-2 ">
                  <FaUser className=" px-1 text-2xl" />
                  <span>Profile</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/orders/history')} w-full items-center p-2 shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/orders/history`} >
                <div className="flex gap-2 ">
                  <FaClock className=" px-1 text-2xl" />
                  <span>Orders</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/contact-us')} w-full items-center p-2 shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`contact-us`} >
                <div className=" flex gap-2 ">
                  <FaMessage className=" px-1 text-2xl" />
                  <span>Contact Us</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/setting')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/settings`} >
                <div className=" flex gap-2 ">
                  <FaGears className=" px-1 text-2xl" />
                  <span>Setting</span>
                </div>
              </Link>
            </li>

              
                
          </ul>
        </nav>
      </aside> 
    </>
  )
}