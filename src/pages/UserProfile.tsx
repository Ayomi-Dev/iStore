
import { PageWrapper } from "../utils/PageWrapper";
import { useUserContext } from "../contexts/UserContext";


export const UserProfile = () => {
  const { user } = useUserContext()
  
  return (

    <PageWrapper>
      {user ? (
        <>
        <h1>{user.message}</h1>
        <p>Your username is {user?.name} and your email is  {user?.email}</p>
        </>
      )
      :
      (
        <p>No user logged in</p>
      )
    
    }
    </PageWrapper>
  )
}
