import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/orderSlice';
import type { RootState, AppDispatch } from '../redux/store';


export const OrdersHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='md:w-[60%] w-full mx-auto'>
      <h2 className="text-xl font-semibold text-center mb-4">My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="mb-4 p-4 rounded shadow-md">
          <p className='text-black'><strong className='text-pink-600 font-semibold'>Total:</strong> <span className="font-bold">${(order.totalAmount)}</span> </p>
          <p><strong>Payment ID:</strong> {order.paymentIntentId}</p>
          <p><strong>Date:</strong> {new Date(order.paidAt).toLocaleString()}</p>
          <ul className="mt-2">
            {order.orderItems.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item.name} - {item.quantity} × ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
   
  );
};

