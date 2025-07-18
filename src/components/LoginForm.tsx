import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";



export const LoginForm = () => {
    const { login } = useUserContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate()

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try{
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, //calls api  and then verify user info
                {
                    email, password
                },
            )

            const token = data.token; //extracts jwt assigned to user info
            const profileInfo = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, //calls the api with endpoint to extract info of the user
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const userProfile = profileInfo.data
            
            login(token, userProfile)

            if(userProfile.isAdmin){ //navigates profile page if user is an admin or not
                navigate('/admin/dashboard')
            }
            else{
                navigate('/profile')
 
            } 
        }
        catch(err: any) {
            console.log(err);
            setError(err.response.data.message || 'Login failed!')
        }
        finally{
            setLoading(false)
        }
       
    }
  return (
    <>
        <form action="" onSubmit={loginUser} w-full>
            <input type="email" name='email' className='block w-full p-2 mb-3 border' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name='password' className='block w-full p-2 mb-3 border'  value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='border p-2 rounded-md' disabled={loading}>{loading ? 'Loggin in...' : 'Login'}</button>
        </form>
        <Link to={`/sign-up`}>Sign Up</Link>
        {error && (
            <p className="text-red-500">{error}</p>
        )}
    </>
  )
}
