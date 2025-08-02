import React, { useState } from 'react';
import { PageWrapper } from '../utils/PageWrapper';
import { WishCard } from '../components/profile/WishCard';
import { Info } from '../components/profile/Info';
import { UserOrders } from '../components/profile/UserOrders';
import { Settings } from '../components/profile/Settings';
import { OrderCard } from '../components/OrderCard';


export const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState();


  ;

  return (
    <PageWrapper>
      <div className="md:flex block ">

      <div className="flex-1 bg-white text-white grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 mx-auto py-6 px-4">
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