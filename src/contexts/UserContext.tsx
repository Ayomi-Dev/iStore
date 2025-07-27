import { useContext, createContext, type ReactNode, useState, useEffect } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    message: string;
    isAdmin: boolean
}

interface UserContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    token: string | null;
    sidePanel: boolean;
    openSidePanel: () => void
    isLoading: boolean
}

const UserContext = createContext<UserContextType>({
    user: null,
    login: () => {},
    logout: () => {},
    token: null,
    sidePanel: false,
    openSidePanel: () => {},
    isLoading: true
});

export const UserProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null)
    const [sidePanel, setSidePanel] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)

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
                    });
                }
            }
        }
        setIsLoading(false)
    }, [])

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


    const value = {user, token, login, logout, sidePanel, openSidePanel, isLoading}
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