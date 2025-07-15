import { useContext, createContext, type ReactNode, useState } from "react";


interface User {
    _id: string;
    name: string;
    email: string;
}


interface UserContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void
    token: string | null
}

const UserContext = createContext<UserContextType>({
    user: null,
    login: () => {},
    logout: () => {},
    token: null
});


export const UserProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null)

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

    const value = {user, token, login, logout}
    return(
        <UserContext.Provider value = { value }>
            { children }
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context){
        throw new Error("useNoteContext must be used within a NoteProvider")
    }
    return context;
}