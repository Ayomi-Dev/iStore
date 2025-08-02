import { createContext, useContext, useState, type FC, type ReactNode } from "react";
import { toast } from "react-toastify";
// import { Products } from "./ProductsContext";


export interface WishItem {
    _id: string;
    name: string;
    image: string;
    price: number;
}

interface WishContextType {
    wishItems: WishItem[];
    addToWishItems: (product: WishItem) => void;
    removeFromWishItems: (id: string) => void;
    isAdded: (id: string) => boolean 
}

const WishListContext = createContext<WishContextType | undefined>(undefined)

export const WishListContextProvider: FC<{children : ReactNode}> = ({ children }) => {
    const [wishItems, setWishItems] = useState<WishItem[]>([]);
    

    const addToWishItems = (product: WishItem) => {
        const existingItem = wishItems.find(item => item._id === product._id)

        if(!existingItem){
            setWishItems(prevItems => [...prevItems, product])
            toast.success("Item added to wish list");
            return
        }
        toast.error("Item already in wishlist");
        return;
    }

    const isAdded = (id: string) => {
        return wishItems.some(item => item._id === id)
    }

    const removeFromWishItems = (id: string) => {
        setWishItems(prevItems => prevItems.filter(item => item._id !== id));
        toast.success("Item removed from wish list")
    }
    const value = {wishItems, addToWishItems, removeFromWishItems, isAdded}
  return (
    <WishListContext.Provider value = { value }>
        { children }
    </WishListContext.Provider>
  )
}

export const useWishListContext = () => {
    const context = useContext(WishListContext);
    if(!context){
        throw Error("context must be inside a provider ")
    }
    return context
}
