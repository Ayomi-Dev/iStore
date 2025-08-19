import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export interface Review {
    userName: string
    review: string;
    date: string
}
type FilterOptions = {
  name?: string;
  category?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
  min?: string;
  max?: string;
  rating?: string;
  brand?: string;
};

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
  brand: string
}

interface ProductContextType {
    allProducts: Products[];
    loading: boolean;
    error: string;
    setAllProducts: React.Dispatch<React.SetStateAction<Products[]>>;
    fetchProducts: () => Promise<void>;
    getProductsByCategory: (category: string) => Products[];
    filteredProducts: Products[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<Products[]>>
    filterProducts: (filters: FilterOptions) => {};
    selectedCategoryProducts: (category: string) => void;
    categoryProducts: Products[];
}

const ProductContext = createContext<ProductContextType | null>(null) 

export const ProductListProvider: React.FC<{ children : ReactNode}> = ( { children } ) => {
    const [allProducts, setAllProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
    const [categoryProducts, setCategoryProducts] = useState<Products[]>([]);
    
    

    const fetchProducts = async () => {
        setLoading(true)
        try {
           const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`) 
           setLoading(false)
           setAllProducts( data ) 
        } 
        catch (error) {
            console.log(error)
            setError('Error loading products');
        }
        finally{
            setLoading(false);
        }
      } 
    useEffect(() => { //fetches all products from the database once the app mounts
      fetchProducts();
    },[]);

    const usedCategories = new Set<string>();

    const getProductsByCategory = (category: string) => {
        const normalized = category.trim().toLowerCase();

        if (usedCategories.has(normalized)) {
            return []; // Already used, prevent duplicates
        }
        usedCategories.add(normalized);

        const filteredProducts = allProducts.filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase())

        const shuffleProducts = filteredProducts.sort(() => Math.random() - 0.5);

        const selectedProducts = shuffleProducts.slice(0,3);

        return selectedProducts
    }
    
    
    const navigate = useNavigate()
    const filterProducts = async (filters: FilterOptions) => {
        setLoading(true);

        try {
            const searchParams = new URLSearchParams();  //
            for(const key in filters){ //
                const value = filters[key as keyof typeof filters];   
                if(value !== undefined && value !== '' ) searchParams.append(key, value.toString());
            }
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?${searchParams.toString()}`);
            
            if(!data || data.length === 0){
                setFilteredProducts([]); 
                setError('No matching products found')
            }
            else{
                setFilteredProducts( data )
                setError('')
            }
        } 
        catch (error) {
            console.error(error);
            setError("Can't filter products, try again!")
        }
        finally{
            setLoading(false)
        }
        navigate('/products')
    }


    const selectedCategoryProducts = (category: string) => {
        const matchedProducts = allProducts.filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase() );

        setCategoryProducts(matchedProducts);
    }

    
    const value = { 
        allProducts, 
        loading, 
        error, 
        setAllProducts, 
        fetchProducts, 
        getProductsByCategory, 
        setFilteredProducts, 
        filteredProducts, 
        filterProducts,
        selectedCategoryProducts,
        categoryProducts
    }
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