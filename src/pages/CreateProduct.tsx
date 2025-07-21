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
        stock: '',
        images: []   
   });
   const [imageFiles, setImageFiles] = useState<File[]>([]);

   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>("");

   const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({...product, [e.target.name]: e.target.value}) //spreads out the product object, then assigns value of the corresponding fieldname of each of the form as its property value.
   } 
   const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    setImageFiles(Array.from(e.target.files));

    const urls = Array.from(e.target.files).map(file =>
      URL.createObjectURL(file)
    );
    setImagePreviewUrls(urls);
  }
};
   
   const uploadImages =  async (files: File[]): Promise<string[]> => { //extract selected image files and sends to the backend for storage
        const formData = new FormData();
        for(let file of files) {
            formData.append('images', file)
        }

        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/upload/images`,
            formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }
        );
        console.log(data.images)
        return data.images  //returns the image urls saved in the backend storage
   }
   const addNewProduct = async(e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError("")

        try{
            const   uploadedImageUrls = await uploadImages(imageFiles)  //assigns the list of urls to the imageUrl variable
            
            const productToSend = {...product, images: uploadedImageUrls} //spreads out the product object and assigns the imageUrls as the value of its images property
            
            await axios.post(`${import.meta.env.VITE_API_URL}/products/admin/create`, productToSend, 
                {                 
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            alert('product created')
            // navigate('/products')
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
          <input name="images" multiple type='file' placeholder="Image URLs" onChange={handleImageChange } />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading? 'Adding new product...' :'Create Product'}</button>
        </form>
        {imagePreviewUrls.length > 0 && (
  <div className="flex gap-2 flex-wrap border h-[200px] mt-2">
    this is img preview
    {imagePreviewUrls.map((url, index) => (
      <img key={index} src={url} alt="preview" className="w-24 h-24 object-cover rounded" />
    ))}
  </div>
)}
        {error && <p>{error}</p>}
    </>
  )
}
