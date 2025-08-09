import React from 'react';
import { PageWrapper } from '../utils/PageWrapper';
import { WishCard } from '../components/profile/WishCard';
import { Info } from '../components/profile/Info';
import { UserOrders } from '../components/profile/UserOrders';
import { Settings } from '../components/profile/Settings';
import { OrderCard } from '../components/OrderCard';
import { useUserContext } from '../contexts/UserContext';


export const UserProfile: React.FC = () => {

  const {user} = useUserContext()

  

  return (
    <PageWrapper>
      <h1 className="text-lg text-center py-3 font-bold">{user?.message}</h1>
      <div className="flex flex-col md:flex-row ">
        <div className="md:flex-1 w-full text-white flex flex-wrap border gap-4 mx-auto px-4">
          <Info />

          <WishCard />

          <UserOrders />

          <Settings />
        </div>
        <OrderCard />
      </div>
    </PageWrapper>
  );
};