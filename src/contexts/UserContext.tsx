import axios from "axios";
import { useContext, createContext, type ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface User {
    _id: string;
    name: string;
    email: string;
    message: string;
    isAdmin: boolean;
    image: string;
    address: string;
    phone: number
}

interface UserContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    token: string | null;
    sidePanel: boolean;
    openSidePanel: () => void
    isLoading: boolean;
    adminUsers: User[];
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    getAdminUsers: () => Promise<void>
    deleteUser: (id: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null)
    const [sidePanel, setSidePanel] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)
    const [adminUsers, setAdminUsers] = useState<User[]>([]);


    const getAdminUsers = async () => {
        try {
           const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/admin/all-users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
           })
           setAdminUsers( data )
        }
        catch (error) {
            console.log(error)
        }
    }
 

    const deleteUser = async(id: string) => {
        try{
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/deactivate/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
    // const getUserById = async() => {

    // }

    useEffect(() => {
        const userToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('userProfile');

        if(userToken){
            setToken(userToken)
            
            if(storedUser){
                setUser(JSON.parse(storedUser))
            }
            else{
                const jwtUser = parseJwt(userToken);
                if(jwtUser){
                    setUser({
                        _id: jwtUser._id,
                        name: "",
                        email: jwtUser.email,
                        message: "",
                        isAdmin: jwtUser.isAdmin,
                        image: jwtUser.image,
                        address: jwtUser.address,
                        phone: jwtUser.phone
                    });
                }
            }
        }
        setIsLoading(false)
    }, [])

    const location = useLocation()
    useEffect(() => { //resets side panel whenever url pathname changes
        setSidePanel(false)
    }, [location.pathname])



    const parseJwt = (token: string): User | null => { //a helper function to help decode a JWT i.e extract the info attached to the token
        try {
            return JSON.parse(atob(token.split(".")[1]))
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem("userProfile", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);  
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem("userProfile");
        setToken(null);
        setUser(null)
    }
    const openSidePanel = () => {
        setSidePanel(!sidePanel)
    }


    const value = {user, setUser, token, login, logout, sidePanel, openSidePanel, isLoading, adminUsers, getAdminUsers, deleteUser}
    return(
        <UserContext.Provider value = { value }>
            { children }
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context){
        throw new Error("userContext must be used within a userContextProvider")
    }
    return context;
}