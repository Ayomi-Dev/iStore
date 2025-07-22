import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductsContext"
import { useEffect, useState } from "react";
import  { type CartItem, addItems } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { ConvertToCartItem } from "../utils/ConvertToCartItem";



export const Details = () => {
    const { allProducts } = useProductContext();
    const { id } = useParams()
    const dispatch = useDispatch()
    const currentProduct = allProducts?.find(product => product._id === id)
    const [quantity, setQuantity] = useState(1);
    let total = currentProduct?.total ?? 0;

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

    
    //adding selected item by customer to the cart list
    const addItemToCart = (product: CartItem) => {
        dispatch(addItems({ ...product, quantity, total }))        
    }

    //displaying individual image on the main image view
    const [mainImg, setMainImg] = useState(currentProduct?.images[0])
    const changeImg = (image:string) => {
        setMainImg(image)
    }
    
     useEffect(() => { //automatically updating product prices whenever the quantity changes
        total = (total * quantity)
    }, [quantity]);

    const [review, setReview] = useState<string>('');
    const [customer, setCustomer] = useState<string>('');

    const handleReview = (e:React.FormEvent) => {
        e.preventDefault();

        if(currentProduct){
            currentProduct.reviews.push(review)
        }
        
    }

  return (
    <div className="w-full">
        {currentProduct && 
            (
                <div className="w-full">

                    <div className="flex flex-col md:flex-row py-3 gap-2 mx-auto shadow-lg rounded-sm bg-white mt-4 w-11/12">
                        <div className="img-width">
                            <div className="imgh w-full overflow-hidden">
                                <img src={mainImg} className='rounded-md w-full' alt="" />
                            </div>

                            <div className="more mx-auto my-5 h-20">
                                {currentProduct?.images.map((image, index) => 
                                    {
                                        return(
                                            <img src={image} key={index} onClick={() => changeImg(image)} className="rounded-sm w-20 inline-block mx-2"></img>
                                        )
                                    })
                            
                                }
                            </div>
                        </div>

                        <div className="flex-col justify-center md:justify-start mt-4 ml-8 ">
                            <h1 className='mb-4 font-bold md:text-2xl'>{currentProduct?.name}</h1>
                            <div className="rating  flex gap-2 mb-3">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half"></i>
                                <p className="font-bold ml-8">(4.5)</p>
                            </div>
                            <h2 className='mb-4 text-pink-500 md:text-2xl font-bold '>${currentProduct?.price}</h2>
            
                
                            {/* <div className="size flex  mb-4 ">

                                    {sizes.map((size,index) => 
                                        (<span className='bg-gray-600'  key={index} onClick={() => chooseSize(size)}>
                                            {size}
                                        </span>)
                                    )}
                            </div> */}


                            <div className="flex  mb-4">
                                <FaCircleMinus className="fa fa-circle-minus md:text-2xl" onClick={() => handleDecrease()} />
                                <span className='mx-3 md:text-2xl text-pink-400 font-bold'>{ quantity }</span>
                                <FaCirclePlus className="fa fa-circle-plus md:text-2xl" onClick={() => handleIncrease()} />
                            </div>
                
                            <div className="flex  h-9 w-4/5 mt-5">

                                {/* <button className='hover:bg-black m-0 shadow-md'
                                    onClick={() => addItemToWishList(product)}>
                                    <i className="fa fa-heart"></i>
                                </button> */}

                                <button
                                    className='hover:bg-black my-0 ml-4 shadow-md'
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

                    <div className="review w-11/12 mx-auto flex">
                        <h1 className={`${tab !== 'desc' ? 'inactive' : 'active' } active font-bold cursor-pointer`}
                         onClick={() => activeTab('desc') }>
                            Details
                        </h1>
                        <h1 className={`${tab === 'review' ? 'active' : '' } mx-5 font-bold cursor-pointer`}
                         onClick={() => activeTab('review') }>
                            Reviews <span className=''>(4.5)</span>
                        </h1>
                    </div>

                    <div className="w-11/12 mx-auto">
                        {tab ===  'desc' ? 
                            (<div className="review">
                                <h2>{currentProduct?.description}</h2>
                            </div>)

                            :  
                            
                            (<div className="review">
                                <h2>This is review</h2>
                            </div>)
                        }
                    </div>
                    <div className="block mt-8 w-11/12 mx-auto">
                    <h1 className='font-bold text-lg mb-4 text-center md:text-left'>Let's hear from you</h1>
                    <form action="" className='pt-4 mx-auto md:m-0' onSubmit={ handleReview }>

                        <div className="form-group">
                            <input required type="text" value={customer}  onChange={(e) => setCustomer(e.target.value)} />
                            <label htmlFor="" >Name</label>
                        </div>

                        <div className="form-group">
                            <textarea required id="" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                            <label htmlFor="">Share your experience here</label>
                        </div>

                        <button>Send Review</button>
                    </form>
                    </div>
                </div>

            )
        }
    </div>
  )
}
