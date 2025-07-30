import React, { useState } from "react";
import axios from "axios";
import { FaCheck, FaCircle, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useUserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignupForm = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] =  useState<string>('');
    const { login } = useUserContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    

    //creating an object for password conditions
    const [passwordConditions, setPasswordConditions ] = useState({
        length: false,
        number: false,
        uppercase: false,
        lowercase: false,
        specialCase: false
    })
    const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value)
    }
    const validatePassword = (password: string) => {
        const lengthCondition = password.length >= 8;//checking if password length is greater than or equal to 8
        const lowercaseCondition = /[a-z]/.test(password);//checking if pasword  contains lowercase letter
        const upperCaseCondition = /[A-Z]/.test(password);//checking if pasword  contains uppercase letter
        const numberCondition = /\d/.test(password); //checking if pasword  contains a number
        const specialCaseCondition = /[!@#$%^&.*]/.test(password);//checking if pasword value contains a special xter
        


        setPasswordConditions({
            length: lengthCondition,
            number: numberCondition,
            uppercase: upperCaseCondition,
            lowercase: lowercaseCondition,
            specialCase: specialCaseCondition
        });
    }

    
    
    const handleSignUp = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("")
        toast.loading(`Signing up...`)

        const { length, number, uppercase, lowercase, specialCase} = passwordConditions;
        const allValid = length && number && uppercase && lowercase && specialCase;

        if(!allValid){
            setErrorMessage("Password does not fully match conditions");
            setLoading(false);
            return;
        }
        if(password !== confirmPassword){
            setErrorMessage("Passwords does not match");
            setLoading(false);
            return;
        }


         
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-up`,
                {
                    email,
                    name, 
                    password,
                    confirmPassword,
                }
            )
            const token = data.token
            const profileInfo = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userProfile = profileInfo.data
            login(token, userProfile);
            toast.success(`Welcome, ${userProfile.name}`)
            setTimeout(() => {
                toast.dismiss()  
            }, 3000);
            navigate('/')
        } 
        catch (error:any) {
           console.log(error.response.data.message) 
           setLoading(false)
        }
        finally{
            setLoading(false)
        }

    }




  return (
        
    <div className="w-full md:w-4/5 mx-auto bg-white">
        <form action="" onSubmit={ handleSignUp } className='mt-4 rounded-sm shadow-md py-4'>
                
            <div className="form-group">
                <FaUser className="fa"/>
                <input  type="text" name="name" onChange={(e) => {setName(e.target.value)}} value={name}  />
                <label htmlFor="">Username</label>
            </div>
            
            <div className="form-group">
                <FaEnvelope className="fa" />
                <input required type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="">Email</label>
            </div>
            <div className="form-group">
                <FaLock className="fa" />
                <input required type="password" name="password" onChange={ handlePasswordValidation} 
                value={password}  />
                <label htmlFor="">Password</label>
            </div>
            <div className="form-group">
                <FaLock className="fa" />
                <input required type="password" name="confirmPassword" onChange={(e) => {setConfirmPassword(e.target.value)}}    />
                <label htmlFor="">Confirm Password</label>
            </div>
            <div className="block ml-5 mb-4">
                <h1 className='text-sm text-gray-500'>Password should contain at least:</h1>
                <ul className='checks'>
                    <li className="flex items-center gap-2">
                        {passwordConditions.length
                         ? 
                            (<FaCheck className="text-xs text-green-400"/>)
                          : 
                            (<FaCircle className="text-xs text-gray-300"/>)
                        }
                        
                        <span className={`${passwordConditions.length ? "text-green-400" : "text-gray-300"}`}>8 characters in length</span>
                    </li>
                    <li className="flex items-center gap-2">
                        {passwordConditions.lowercase
                         ? 
                            (<FaCheck className="text-xs text-green-400"/>)
                          : 
                            (<FaCircle className="text-xs text-gray-300"/>)
                        }
                        
                        <span className={`${passwordConditions.lowercase ? "text-green-400" : "text-gray-300"}`}>A lowercase letter</span>
                    </li>
                    <li className="flex items-center gap-2">
                        {passwordConditions.number
                         ? 
                            (<FaCheck className="text-xs text-green-400"/>)
                          : 
                            (<FaCircle className="text-xs text-gray-300"/>)
                        }
                        
                        <span className={`${passwordConditions.number ? "text-green-400" : "text-gray-300"}`}>A number</span>
                    </li>
                    <li className="flex items-center gap-2">
                        {passwordConditions.specialCase
                         ? 
                            (<FaCheck className="text-xs text-green-400"/>)
                          : 
                            (<FaCircle className="text-xs text-gray-300"/>)
                        }
                        
                        <span className={`${passwordConditions.specialCase ? "text-green-400" : "text-gray-300"}`}>A special character</span>
                    </li>
                    <li className="flex items-center gap-2">
                        {passwordConditions.uppercase
                         ? 
                            (<FaCheck className="text-xs text-green-400"/>)
                          : 
                            (<FaCircle className="text-xs text-gray-300"/>)
                        }
                        
                        <span className={`${passwordConditions.uppercase ? "text-green-400" : "text-gray-300"}`}>An uppercase letter</span>
                    </li>
                </ul>
            </div>
            
            <div className="flex flex-col items-center gap-4">
                <button className='w-[95%] mx-auto cursor-pointer text-white px-4 py-2 rounded-md sm:w-1/2 bg-[#f31b87] hover:bg-green-500 transition duration-500 ease-in-out font-bold ' disabled={loading}>{loading ? 'Signing up...' : 'Sign up'}</button>
                <p className='text-sm cursor-pointer'>
                    Already have an account? 
                    <Link to={`/login`} className="text-green-400 pl-2 hover:text-green-500 font-bold duration-75 cursor-pointer">
                        Login
                    </Link>
                </p>
            </div>

        </form>

        {errorMessage && <p>{errorMessage}</p>}
    </div>

    
  )
}