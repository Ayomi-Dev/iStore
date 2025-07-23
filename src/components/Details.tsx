import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductsContext"
import { useEffect, useState } from "react";
import  { type CartItem, addItems } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { ConvertToCartItem } from "../utils/ConvertToCartItem";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";



export const Details = () => {
    const { allProducts, fetchProducts } = useProductContext();
    const { user } = useUserContext()
    const { id } = useParams()
    const dispatch = useDispatch()
    const currentProduct = allProducts?.find(product => product._id === id)
    const [quantity, setQuantity] = useState(1);

    const unitPrice = currentProduct?.price || 0 //extracts the price of the current product
    const [total, setTotal] = useState(unitPrice)
            

    //switching between review and description tabs
    const [tab, setTab] = useState('desc');
    const activeTab = (tabbName: string) => {
        setTab(tabbName)
    }


    const handleIncrease = ( ) => {//increases product quantity by 1
        setQuantity(quantity + 1)
    }


    //decreasing product quantity by 1 on every click
    const handleDecrease = ( ) => {
        setQuantity(Math.max(1, quantity - 1))//minimum value of product quantity must be 1
    }

    
    //adding selected item by userName to the cart list
    const addItemToCart = (product: CartItem) => {
        dispatch(addItems({ ...product, quantity, total }))        
    }

    //displaying individual image on the main image view
    const [mainImg, setMainImg] = useState(currentProduct?.images[0])
    const changeImg = (image:string) => {
        setMainImg(image)
    }
    
     useEffect(() => { //automatically updating product price whenever its quantity changes
       if(currentProduct){
           setTotal (currentProduct?.price * quantity) 
       }
        
    }, [quantity, currentProduct]);
    

    const [review, setReview] = useState<string>('');

    const handleReview = async (e:React.FormEvent) => {
        e.preventDefault();

        if(!review || !user)return
        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        const fullDate = `${month}/${day}/${year}`
        const newReview = {
            userName: user.name,
            review,
            date: fullDate
        }

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}/review`, {review: newReview}, { //sends the review contents to the server
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            await fetchProducts();
            setReview("")
        } 
        catch (err: any) {
            console.error('Review update error:', err.response || err);
            
        }

        
    }

  return (
    <div className="w-full">
        {currentProduct && 
            (
                <div className="w-full">

                    <div className="flex flex-col md:flex-row py-3 gap-2 items-center mx-auto h-screen shadow-lg rounded-sm bg-white mt-4 w-11/12">
                        <div className="flex-1 h-full">
                            <div className="w-[500px] mx-auto h-[500px]">
                                <img src={mainImg} className='rounded-md w-full object-cover h-full' alt="" />
                            </div>

                            <div className="w-[500px] mx-auto my-5 h-20">
                                {currentProduct?.images.map((image, index) => 
                                    {
                                        return(
                                            <img src={image} key={index} onClick={() => changeImg(image)} className="cursor-pointer hover:transform hover:scale-[1.2] transition-[0.6s] ease-in-out  rounded-sm shadow-lg w-20 inline-block mx-2"></img>
                                        )
                                    })
                            
                                }
                            </div>
                        </div>

                        <div className="flex-col w-2/5 gap-4 justify-center md:justify-start">
                            <h1 className='mb-4 font-bold md:text-2xl'>{currentProduct?.name}</h1>
                            <div className="flex items-center gap-2 mb-3">
                                <FaStar className="text-orange-300" />
                                <FaStar className="text-orange-300" />
                                <FaStar className="text-orange-300" />
                                <FaStar className="text-orange-300" />
                                <FaStarHalf className="text-orange-300" />
                                <p className="font-bold">(4.5)</p>
                            </div>
                            <h2 className='mb-4 text-pink-500 md:text-2xl font-bold '>${currentProduct?.price}</h2>
            
                
                            {/* <div className="size flex  mb-4 ">

                                    {sizes.map((size,index) => 
                                        (<span className='bg-gray-600'  key={index} onClick={() => chooseSize(size)}>
                                            {size}
                                        </span>)
                                    )}
                            </div> */}


                            <div className="flex items-center mb-4">
                                <FaCircleMinus className="cursor-pointer md:text-2xl" onClick={() => handleDecrease()} />
                                <span className='mx-3 md:text-2xl text-pink-400 font-bold'>{ quantity }</span>
                                <FaCirclePlus className="cursor-pointer md:text-2xl" onClick={() => handleIncrease()} />
                            </div>
                
                            <div className="flex  h-9 w-4/5 mt-5">

                                {/* <button className='hover:bg-black m-0 shadow-md'
                                    onClick={() => addItemToWishList(product)}>
                                    <i className="fa fa-heart"></i>
                                </button> */}

                                <button
                                    className='hover:bg-pink-600 cursor-pointer transition-[0.7s] ease-in-out font-bold bg-pink-500 text-white py-2 px-4 rounded-md shadow-md'
                                    onClick={() => {
                                        if (currentProduct) {
                                            addItemToCart(ConvertToCartItem(currentProduct));
                                        }
                                    }}
                                    disabled={!currentProduct}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="py-3 w-11/12 mx-auto flex">
                        <h1 className={`${tab !== 'desc' ? 'text-black' : 'text-pink-500' } active font-bold cursor-pointer`}
                         onClick={() => activeTab('desc') }>
                            Details
                        </h1>
                        <h1 className={`${tab === 'review' ? 'text-pink-500' : 'text-black' } mx-5 font-bold cursor-pointer`}
                         onClick={() => activeTab('review') }>
                            Reviews <span className=''>({currentProduct.numReviews})</span>
                        </h1>
                    </div>

                    <div className="w-11/12 mx-auto">
                        {tab ===  'desc' ? 
                            (<div className="">
                                <h2>{currentProduct?.description}</h2>
                            </div>)

                            :  
                            
                            (<ul className="block">
                                {currentProduct.reviews.map((review, index) => {
                                    return(
                                        <li key={index} className="block my-2">
                                            <h1 className="font-bold"><span className="text-pink-600">{user?.name}</span> {review.date}</h1>
                                            <p>{review.review}</p>
                                        </li>
                                    )
                                })}
                            </ul>)
                        }
                    </div>
                    <div className="block mt-8 w-11/12 mx-auto">
                    <h1 className='font-bold text-lg mb-4 text-center md:text-left'>Let's hear from you</h1>
                    <form action="" className='mx-auto md:m-0' onSubmit={ handleReview }>
                        <div className="form-group">
                            <textarea required id="" value={review} placeholder="Share your experience here" onChange={(e) => setReview(e.target.value)}></textarea>
                        </div>

                        <button type="submit" className="cursor-pointer py-2 px-4 font-semibold bg-pink-500 rounded-md text-white hover:bg-pink-700 transition-[0.6s] ease-in-out">Send Review</button>
                    </form>
                    </div>
                </div>

            )
        }
    </div>
  )
}
