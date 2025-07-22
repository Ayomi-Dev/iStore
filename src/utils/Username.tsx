import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";


export const Username = () => {
  const { user } = useUserContext()
  const [greeting, setGreeting] = useState<string>('')
  

  useEffect(()  => {
   
      const time = new Date();
      let hour = time.getHours();

      if(hour < 12 ){
          setGreeting('Good Morning')
      }
      else if(hour >= 12 && hour < 18){
        setGreeting('Good Afternoon')
      }
      else{
        setGreeting('Good Evening')
      }
      
  }, [])
  
  return (
    <>
      {user ? (

        user?.isAdmin ? 
          
          ( 
            <h1 className="text-xs md:text-lg font-bold px-2">Hello, <span className="text-blue-600">Admin</span></h1>
          )
          : 
              (
                <div className='flex justify-center items-center h-full'>
                  <h1 className='text-xs md:text-lg font-bold'>{greeting},</h1>
                  <h1 className="text-pink-500 text-xs md:text-lg font-bold px-2">{user.name}</h1>
                </div>
              )
            
        )
        :
        (<span></span>)
      }
    </>
  )
}
