
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
      
      <aside className={`${sidePanel ? 'translate-x-0 ' : '-translate-x-full'} fixed  w-[75%] overflow-auto 
        z-[100] h-[100vh] px-4 md:w-[15%] transform transition-transform
        duration-300 ease-in-out bg-gray-50 `}>
        {user ? (

        <Link to={`/profile/edit/${user?._id}`} className="mx-auto relative flex flex-col w-full items-center justify-center mt-4">
          {!user?.image ? (<div className='absolute text-gray-300'>Add image</div>) : ("")}
            <img src={user?.image} className='w-28 h-28 rounded-full object-cover border-white border-8 shadow-md' alt="" />
            <span className="text-pink-600 my-2 text-center font-bold">{user?.name}</span>
        </Link>
        ): ("")}

        <nav className="w-full py-3">
          <ul className="flex flex-col items-center justify-center mx-auto">
                
            <li className={`${activePage('/')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/`} className='w-full'>
                <div className="flex gap-2 ">
                  <FaHome className=" px-1 text-2xl"/>
                  <span>Home</span>
                </div>
              </Link>
            </li>
            
            <li className={`${activePage('/products')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/products`} className='w-full'>
                <div className="flex gap-2 ">
                  <FaCompass className=" px-1 text-2xl"/>
                  <span>Shop</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/my-wishlist')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/my-wishlist`} className='w-full' >
                <div className="gap-2  relative flex">
                  <FaHeart className=" px-1 text-2xl" />
                  <span>Wishlist</span>
                  <span className='count'>{wishItems.length}</span> 
                </div>
              </Link>
            </li>
            <li className={`${activePage('/cart')} w-full items-center p-2 shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/cart`} className='w-full'>
                <div className="flex gap-2 ">
                  <FaCartPlus className=" px-1 text-2xl" />
                  <span>Cart</span>
                  {/* <span className='count'>{cartItems.length}</span> */}
                </div>
              </Link>
            </li>
            <li className={`${activePage('/profile')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/profile`} className='w-full' >
                <div className="flex gap-2 ">
                  <FaUser className=" px-1 text-2xl" />
                  <span>Profile</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/orders/history')} w-full items-center p-2 shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/orders/history`} className='w-full' >
                <div className="flex gap-2 ">
                  <FaClock className=" px-1 text-2xl" />
                  <span>Orders</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/contact-us')} w-full items-center p-2 shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`contact-us`} className='w-full'>
                <div className=" flex gap-2 ">
                  <FaMessage className=" px-1 text-2xl" />
                  <span>Contact Us</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/setting')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/settings`} className='w-full' >
                <div className=" flex gap-2 ">
                  <FaGears className=" px-1 text-2xl" />
                  <span>Setting</span>
                </div>
              </Link>
            </li>

              
                
          </ul>
        </nav>
      </aside> 
   
  )
}