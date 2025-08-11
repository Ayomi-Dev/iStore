import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FaAddressBook, FaImage, FaPhone, FaUser } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../contexts/UserContext";

export const EditUser = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setUser } = useUserContext()
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewImg, setPreviewImg] = useState<string | null>(null)
    const navigate = useNavigate();
    
    const [userInfo, setUserInfo]  = useState({
        name: '',
        image: '',
        phone: '',
        address: '',
        email: ''
    });

    useEffect(() => {
        const getCurrentUser = async() => {
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile/edit/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUserInfo(data)
            } catch (error) {
                setErrorMessage("Cannot get your details at this time, please check your internet connection!")
            }
        }

        getCurrentUser();
    }, [])



    const [loading, setLoading] = useState<boolean>(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInfo({...userInfo, [e.target.name] : e.target.value });
    }

    const chooseImage = (e: ChangeEvent<HTMLInputElement>) => { //extracts image file selected by user
        if(e.target.files && e.target.files[0]){
            const file = e.target.files[0]
            setSelectedImage(file);
            setPreviewImg(URL.createObjectURL(file));
        }
        
    }
    

    const updateUserInfo = async(e: FormEvent) => {
        e.preventDefault()
        setLoading(true);

        try {
            const formData = new FormData();
            
            formData.append('name', userInfo.name)
            formData.append('address', userInfo.address)
            formData.append('email', userInfo.email)
            formData.append('phone', userInfo.phone)

            if(selectedImage){
                formData.append("image", selectedImage)
            }
           
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/profile/edit/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    "Content-Type": 'multipart/form-data',
                }
            });
            
            setUser(data.user)
            setPreviewImg(null)

            setTimeout(() => {
                navigate(`/profile`)
            }, 1000);
            
            setTimeout(() => {
                toast.success("Info successfully updated")
            }, 1500);

        } catch (error: any) {
           console.log("edit user error",error.message) ;
           setErrorMessage("Could not update at this time, try again");
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div className="full">
        
        <form action=""  className='mt-4 rounded-sm shadow-md py-4' onSubmit={updateUserInfo}>

            <div className="flex w-30 h-30 mx-auto shadow-md rounded-[50%] flex-col items-center justify-center">
                {previewImg ? (
                    <img src={previewImg} alt="profile-photo" className="w-full h-full rounded-[50%] object-cover" />
                    )
                    :
                    (
                        <img src={userInfo.image} alt="profile-photo" className="w-full h-full rounded-[50%] object-cover" />
                    )
                }  
            </div>
            <div className="w-full flex pb-3 ml-10 cursor-pointer pt-1 items-center gap-4 justify-center">
                <FaImage className="fa" />
                <input required  type="file" name="image"  className="text-gray-400 cursor-pointer" onChange={ chooseImage } />
            </div>  
            <div className="form-group">
                <FaUser className="fa"/>
                <input  type="text" name="name" onChange={handleInputChange} value={userInfo.name}  />
                <label htmlFor="">Username</label>
            </div>

            <div className="form-group">
                <FaUser className="fa"/>
                <input  type="email" name="email" onChange={handleInputChange} value={userInfo.email}  />
                <label htmlFor="">Username</label>
            </div>
            
            <div className="form-group">
                <FaPhone className="fa" />
                <input required type="number" name="phone" onChange={handleInputChange} value={userInfo.phone} />
                <label htmlFor="">Phone No.</label>
            </div>
            
            <div className="form-group">
                <FaAddressBook className="fa" />
                <input required type="text" name="address" onChange= {handleInputChange} value={userInfo.address}  />
                <label htmlFor="">Address</label>
            </div>
            
            <div className="flex items-center justify-center">

            <button disabled={loading}
                className={`${loading ? 'cursor-not-allowed opacity-[0.5]' : 'cursor-pointer'} px-4 py-2 rounded-md text-white bg-green-700`} type="submit">
                    {loading ? "Updating..." : "Update Info"}
            </button>
            </div>
            {errorMessage && <p className="ml-4 w-full text-center py-3 text-sm text-red-500">{errorMessage}</p>}
        </form>

        
    </div>
  )
}
