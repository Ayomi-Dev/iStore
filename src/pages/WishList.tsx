import { Link } from "react-router-dom"
import { useWishListContext } from "../contexts/WishListContext"
import { PageWrapper } from "../utils/PageWrapper"
import { FaShopify } from "react-icons/fa"


export const WishList = () => {
    const {wishItems, removeFromWishItems} = useWishListContext()
  return (
    <PageWrapper>
        <div className="w-full">
            
            {wishItems.length > 0 ? (
                <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
                {wishItems.map((item, index) => 
                    {
                        return(
                            <div key={index} className="flex flex-col bg-white items-center shadow-lg p-4 rounded-lg">
                                <Link to={`/product/${item._id}/details`}>
                                    <img src={item.image} alt={item.name} className="h-48 object-cover mb-2" />
                                </Link>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                                <button 
                                    onClick={() => removeFromWishItems(item._id)} 
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                    Remove from Wishlist
                                </button>
                            </div>
                        )
                    })
                }
            </div>
                )   
                : 
                (
                    <div className="w-full bg-white shadow-md gap-3 rounded-md h-[500px] flex flex-col items-center justify-center ">
                       <h1 className="md:text-2xl text-sm font-bold">Your wish list is empty</h1> 
                       <Link to={'/products'} className="bg-[#f31b87] rounded-md px-3 flex items-center py-1 text-white">
                         <FaShopify className="px-2"/> Shop and add a product..
                       </Link>
                    </div>
                )}
            </div>
    </PageWrapper>
  )
}
