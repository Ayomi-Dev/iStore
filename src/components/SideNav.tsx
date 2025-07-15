import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaClock, FaCompass, FaHeart, FaHome } from 'react-icons/fa';
import { FaGears, FaMessage, FaUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';




export const SideNav = ( ) => {
  const location = useLocation()
  
  const activePage = (path: string) => {
    return location.pathname === path ? 'active' : '';
  }

  return (
    <>
      
      <aside className={`active w-[15%] fixed z-10 bg-white overflow-x-auto h-full px-4 left-0 `}>
        
        <div className="mx-auto shadow-lg w-28 h-28 mt-4">
          {/* <img src={Image} className='w-full rounded-full border-white border-8 shadow-md' alt="" /> */}
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
            <li className={`${activePage('/shop')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/shop`}>
                <div className="flex gap-2 ">
                  <FaCompass className=" px-1 text-2xl"/>
                  <span>Shop</span>
                </div>
              </Link>
            </li>
            <li className={`${activePage('/wishlist')} w-full items-center p-2  shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/wishlist`} >
                <div className="gap-2  relative flex">
                  <FaHeart className=" px-1 text-2xl" />
                  <span>Wishlist</span>
                  {/* <span className='count'>{wishlist.length}</span>  */}
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
            <li className={`${activePage('/history')} w-full items-center p-2 shadow-lg rounded-sm my-2 flex justify-center`}>
              <Link to={`/orders`} >
                <div className="flex gap-2 ">
                  <FaClock className=" px-1 text-2xl" />
                  <span>History</span>
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