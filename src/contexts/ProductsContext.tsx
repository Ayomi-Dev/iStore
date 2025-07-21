import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import axios from 'axios';

export interface Products {
  name: string;
  price: number;
  description: string;
  images: string[];
  _id: string;
  category: string;
}

interface ProductContextType {
    allProducts: Products[] | null;
    loading: boolean;
    error: string;
}

const ProductContext = createContext<ProductContextType | null>(null)

export const ProductListProvider: React.FC<{ children : ReactNode}> = ( { children } ) => {
    const [allProducts, setAllProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    
    useEffect(() => { //fetches all products from the database once the app mounts
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
      fetchProducts();
    },[])
    
    const value = { allProducts, loading, error}
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