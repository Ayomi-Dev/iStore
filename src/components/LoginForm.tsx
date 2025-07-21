import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { FaEnvelope, FaLock } from "react-icons/fa";



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
    <div className='w-[95%] md:w-[60%] shadow-2xl flex flex-col rounded-lg items-center justify-center mx-auto'>
        <form action="" onSubmit={ loginUser } className='mt-4 py-4 w-full h-[500px]'>
            <div className="form-group">
                <FaEnvelope className="fa" />
                <input required type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="">Email</label>
            </div>
            <div className="form-group">
                <FaLock className="fa" />
                <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)} 
                value={password}  />
                <label htmlFor="">Password</label>
            </div>

            <div className="flex flex-col items-center gap-4">
                <button className='w-[95%] mx-auto cursor-pointer text-white px-4 py-2 rounded-md sm:w-1/2 bg-[#f31b87] hover:bg-green-500 transition duration-500 ease-in-out font-bold ' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                <p className='text-sm cursor-pointer'>
                    Don't have an account yet? 
                    <Link to={`/sign-up`} className="text-green-400 pl-2 hover:text-green-500 font-bold duration-75 cursor-pointer">
                        Sign Up
                    </Link>
                </p>
            </div>
        </form>
        
        {error && (
            <p className="text-red-500">{error}</p>
        )}
    </div>
  )
}
