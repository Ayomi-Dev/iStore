import { useNavigate, useParams } from "react-router-dom";
import { type Products, useProductContext } from "../contexts/ProductsContext"
import { useEffect, useState } from "react";
import  { type CartItem, addItems } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { ConvertToCartItem } from "../utils/ConvertToCartItem";
import { FaHeart, FaStar, FaStarHalf } from "react-icons/fa";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { useWishListContext } from "../contexts/WishListContext";
import { ConvertToWishItem } from "../utils/ConvertToWishItem";
import { toast } from "react-toastify";



export const Details = () => { 
    const { fetchProducts } = useProductContext();
    const { addToWishItems, isAdded, removeFromWishItems} = useWishListContext()
    const { user } = useUserContext()
    const { id } = useParams()
    const [currentProduct, setCurrentProduct] = useState<Products>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [quantity, setQuantity] = useState(1);

    const [mainImg, setMainImg] = useState<string>("")
    const changeImg = (image:string) => {
        setMainImg(image)
    }

    const getProduct = async () => { 
        setError("");
        setLoading(true)
        try{
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
            setCurrentProduct(data);
            setMainImg(data.images[0])
            setError("")
        }
        catch(error){
            console.log(error)
            setError('Sorry, product cannot be found. Kindly refresh page.')
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=> { //fetches the selected product whenever the component mounts
        getProduct();
        if(currentProduct){
            setMainImg(currentProduct.images[0])
        }
    }, [])

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
        if(user){
            dispatch(addItems({ ...product, quantity, total }))        
        }
        else{
            toast.warning("Please login to add item to cart");
            setTimeout(() => {
                navigate('/login')
                
            }, 1500);
        }
    }

    //displaying individual image on the main image view
     useEffect(() => { //automatically updates product price whenever its quantity changes
       if(currentProduct){
           setTotal (currentProduct?.price * quantity) 
        }
        
    }, [quantity, currentProduct]);

    const handleWish = (product: Products) => {
        if(isAdded(product._id)){
            removeFromWishItems(product._id)
        }
        else{
            addToWishItems(ConvertToWishItem(product))
        }
        
    }
    
    const [review, setReview] = useState<string>('');

    const handleReview = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        if( !user){
            toast.warning("Please kindly login");
            setLoading(false)
            return
        }
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
            await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}/review`, {review: newReview}, { //sends the review contents to the server
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            fetchProducts();
            setReview("")
            window.location.reload(); //reloads the page to display the new review

        } 
        catch (err: any) {
            console.error('Review update error:', err.response || err); 
        }  
        finally{
            setLoading(false)
        }
    }

  return (
    <div className="w-full flex flex-col items-center justify-center">
        {currentProduct && 
            (
                <div className="w-full">

                    <div className="flex flex-col md:flex-row justify-center py-3 gap-2 items-center shadow-lg rounded-sm bg-white mt-4 w-full">
                        <div className="md:flex-1 w-full h-full">
                            <div className="flex items-center justify-center">
                                {mainImg ? (
                                    <img src={mainImg} className='rounded-md object-cover h-[350px]' alt="" />
                                ) :
                                (
                                    ""
                                )
                                }
                            </div>

                            <div className="w-full md:w-[300px] items-center justify-center mx-auto flex my-5">
                                {currentProduct?.images.map((image, index) => 
                                    {
                                        return(
                                            <img src={image} key={index} onClick={() => changeImg(image)} className="cursor-pointer hover:transform hover:scale-[1.1] transition-[0.6s] ease-in-out h-20 object-center rounded-sm shadow-lg w-20 inline-block mx-2 "></img>
                                        )
                                    })
                            
                                }
                            </div>
                        </div>

                        <div className="flex-col md:w-2/5 w-[80%] mx-auto items-center gap-4 justify-center">
                            <h1 className='mb-4 font-bold md:text-2xl'>{currentProduct?.name}</h1>
                            <h3 className='mb-4 font-semibold md:text-2xl'>{currentProduct?.brand}</h3>
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
                
                            <div className="flex items-center gap-4 h-9 w-full justify-between md:w-4/5 mt-5">
                                <FaHeart className={`${isAdded(currentProduct._id) ? 'text-[#f31b87]' : "text-black"} hover:text-[#f31b87] text-xl cursor-pointer`} onClick={() => handleWish(currentProduct)} />
            
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
                                            <h1 className="font-bold"><span className="text-pink-600">{}</span>{review.userName} {review.date}</h1>
                                            <p>{review.review}</p>
                                        </li>
                                    )
                                })}
                            </ul>)
                        }
                    </div>
                    <div className="block mt-8 w-11/12 py-3 mx-auto">
                    <h1 className='font-bold text-lg mb-4 text-center md:text-left'>Let's hear from you</h1>
                    <form action="" className='mx-auto md:m-0' onSubmit={ handleReview }>
                        <div className="form-group">
                            <textarea required id="" value={review} placeholder="Share your experience here" onChange={(e) => setReview(e.target.value)}></textarea>
                        </div>

                        <button type="submit" className={`${loading ? "opacity-[0.5] cursor-not-allowed" : ""} cursor-pointer py-2 px-4 font-semibold bg-pink-500 rounded-md text-white hover:bg-pink-700 transition-[0.6s] ease-in-out`} disabled={loading}>
                           {loading ? "Sending review" : "Send Review"}
                        </button>
                    </form>
                    </div>
                </div>

            )
        }
        {error && (
            <div className="flex items-center mx-auto justify-center w-[500px] text-black h-[500px] text-2xl font-bold">
                <h2>{error}</h2>
            </div>
        )}
    </div>
  )
}
