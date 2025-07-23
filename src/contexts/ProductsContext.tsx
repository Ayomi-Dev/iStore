import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import axios from 'axios';

export interface Review {
    review: string;
    date: string
}
export interface Products {
  name: string;
  price: number;
  description: string;
  images: string[];
  _id: string;
  category: string;
  total: number;
  reviews: Review[];
  numReviews: number;
}

interface ProductContextType {
    allProducts: Products[] | null;
    loading: boolean;
    error: string;
    setAllProducts: React.Dispatch<React.SetStateAction<Products[]>>;
    fetchProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | null>(null)

export const ProductListProvider: React.FC<{ children : ReactNode}> = ( { children } ) => {
    const [allProducts, setAllProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    

    const fetchProducts = async () => {
          setLoading(true)

        try {
           const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`) 
           setLoading(false)
           setAllProducts( data )
            
        } 
        catch (error) {
            console.log(error)
            setLoading(false)
            setError('Error loading products');
        }
        finally{
            setLoading(false);
        }
      } 
    useEffect(() => { //fetches all products from the database once the app mounts
      fetchProducts();
    },[])
    
    const value = { allProducts, loading, error, setAllProducts, fetchProducts}
    return (
        <ProductContext.Provider value = { value } >
            { children }
        </ProductContext.Provider>
    )
}
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if(!context){
        throw new Error('useProductContext must be within a ProductContextProvider');
    }
    return context;
    
}