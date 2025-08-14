import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../../contexts/ProductsContext';
import { FaCalendarTimes, FaImage, FaMoneyBill, FaProductHunt, FaStackExchange } from 'react-icons/fa';
import { toast } from 'react-toastify';


export const CreateProduct = () => {
  const navigate = useNavigate()
  const { fetchProducts } = useProductContext();
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
    const uploadedUrls: string[] = []

    for(let file of files) {
      const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        formData.append("folder", "products")

        const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }
        );
        uploadedUrls.push(data.secure_url)
    }
        
        return uploadedUrls  //returns the image urls saved in the backend storage
   }
   const addNewProduct = async(e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError("")

        try{
            const  uploadedImageUrls = await uploadImages(imageFiles)  //assigns the list of urls to the imageUrl variable
            
            const productToSend = {...product, images: uploadedImageUrls} //spreads out the product object and assigns the imageUrls as the value of its images property
            
            await axios.post(`${import.meta.env.VITE_API_URL}/api/products/admin/create`, productToSend, 
              {                 
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                }
              }
            )
            await fetchProducts()
            
            toast.success(`Product successfully added`);

            setTimeout(() => {
              navigate('/admin/products')
            }, 2000);
        }
        catch(error){
          console.log(error);
          toast.error("Couln't add product at this time")
          setError("Could not add product");
        }
        finally{
            setLoading(false);
        }
   }
  return (
    <div className="w-full flex justify-center flex-col md:flex-row md:w-4/5 mx-auto bg-white admin">
        <form onSubmit={addNewProduct} className="flex w-full md:flex-1 flex-col gap-4 mx-auto p-4">
          <div className="form-group">
            <FaProductHunt className="fa"/>
            <input name="name"  onChange={handleChange} required />
            <label htmlFor="">Product Name</label>
          </div>
          <div className="form-group">
            <FaMoneyBill className="fa"/>
            <input name="price" type="number"  onChange={handleChange} required />
            <label htmlFor="">Price</label>
          </div>

          <div className="form-group">
            <FaStackExchange className="fa"/>
            <input name="stock" type="number" onChange={handleChange} required />
            <label htmlFor="">Stock</label>
          </div>
          <div className="form-group">
            <FaCalendarTimes className="fa"/>
            <input name="category" onChange={handleChange} />
            <label htmlFor="">Category</label>
          </div>
          <div className="form-group">
            <FaCalendarTimes className="fa"/>
            <input name="brand" onChange={handleChange} />
            <label htmlFor="">Brand</label>
          </div>
          <div className="form-group">
            <textarea name="description" placeholder='Description...' className='border' onChange={handleChange} />
          </div>
          <div className="form-group">
            <FaImage className="fa"/>
            <input name="images" multiple type='file' onChange={handleImageChange } />
          </div>
          <button type="submit" className={`${loading ? "opacity-[0.5] cursor-not-allowed" : ""} bg-blue-600 text-white px-4 py-2 rounded`} disabled={loading}>{loading? 'Adding new product...' :'Create Product'}</button>
        </form>
        {imagePreviewUrls.length > 0 && (
          <div className="flex gap-2 flex-col h-[200px] mt-2">
            {imagePreviewUrls.map((url, index) => (
            <img key={index} src={url} alt="preview" className="w-24 h-24 object-cover rounded" />
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
    </div>
  )
}
