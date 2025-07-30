
import { PageWrapper } from "../utils/PageWrapper";
// import { useUserContext } from "../contexts/UserContext";

import { OrderCard } from "../components/OrderCard";


export const UserProfile = () => {

  // const { orders } = useSelector((state: RootState) => state.order)

  
  return (

    <PageWrapper>
      <div className="flex">
        These are your orders
        <OrderCard />
      </div>
    </PageWrapper>
  ) 
}
