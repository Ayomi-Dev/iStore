import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
    const navigate = useNavigate()
   const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
        
   }) 
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>("");

   const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({...product, [e.target.name]: e.target.value})
   }
   const addNewProduct = async(e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError("")

        try{
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/admin/create`, product, 
                {                
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            console.log(data)
            alert('product created')
            navigate('/products')
            setLoading(false)
        }
        catch(error){
            console.log(error)
            setError("Could not add product")
            setLoading(false)
        }
        finally{
            setLoading(false)
        }
   }
  return (
    <>
        <form onSubmit={addNewProduct} className="flex flex-col gap-4 max-w-md mx-auto p-4">
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
          <input name="category" placeholder="Category" onChange={handleChange} />
          {/* <input name="image" placeholder="Image URL" onChange={handleChange} /> */}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading? 'Adding new product...' :'Create Product'}</button>
        </form>

        {error && <p>{error}</p>}
    </>
  )
}
