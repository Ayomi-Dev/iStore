import { useEffect, useState } from "react";
import { PageWrapper } from "../utils/PageWrapper";
import { useUserContext } from "../contexts/UserContext";

interface Profile {
  _id: string;
  email: string;
  message: string;
  name: string;
}

export const UserProfile = () => {
  const { user } = useUserContext()
  if(!user){
    return <p>No user logged in</p>
  }
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  
  useEffect(()=> {
    const savedUserProfile = localStorage.getItem('userProfile');
    savedUserProfile ? setUserProfile(JSON.parse(savedUserProfile)) : null
  }, [])
  return (

    <PageWrapper>
      <h1>{userProfile?.message}</h1>
      <p>Your username is {userProfile?.name} and your email is  {userProfile?.email}</p>
    </PageWrapper>
  )
}
