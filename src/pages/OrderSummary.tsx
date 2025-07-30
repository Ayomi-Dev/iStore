import { PageWrapper } from "../utils/PageWrapper";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Link, useParams } from "react-router-dom";


export const OrderSummary = () => {
    const { orders } = useSelector((state: RootState) => state.order)
    const { id } = useParams()
    const currentOrder = orders.find(order => order._id === id)
    
  return (
    <PageWrapper >
        {currentOrder && (

        <div className="w-full bg-white flex flex-col items-center justify-center">
            <div className="mb-4 rounded">
                <p><strong>Total:</strong> ${currentOrder?.totalAmount}</p>
                <p><strong>Payment ID:</strong> {currentOrder?.paymentIntentId}</p>
                <p><strong>Date:</strong> {new Date(currentOrder?.paidAt).toLocaleString()}</p>
                <ul className="mt-2">
                    {currentOrder?.orderItems.map((item, index) => (
                        <li className="flex justify-between itemss-center my-3" key={index}>
                    
                         <img src={item.image} className='h-[40px] w-40px] rounded-[50%]' alt="" /> 
                         <span className="font-bold">{item.name}</span>
                         <span className="font-bold text-pink-500">{item.price}</span>
                   
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex">
                <Link to="/orders/history" className="hover:bg-pink-500 bg-black text-white px-4 py-2 rounded">
                    See All Order
                </Link>
            </div>
        </div>
        )
        
        
        }
       
    </PageWrapper>
  )
}
