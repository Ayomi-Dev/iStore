import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../../contexts/ProductsContext';
import { FaCalendarTimes, FaImage, FaMoneyBill, FaProductHunt, FaStackExchange } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const EditProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProducts } = useProductContext();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
    images: [] as string[],
  });
  
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(data);
        setImagePreviewUrls(data.images || []);
      } catch (err) {
        setError("Could not load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);

      const urls = files.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(urls); // replace existing previews
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    for (let file of files) {
      formData.append('images', file);
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products/upload/images`,
      formData,
      {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      }
    );

    return data.images;
  };

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let uploadedImageUrls: string[] = product.images;

      if (imageFiles.length > 0) {
        uploadedImageUrls = await uploadImages(imageFiles);
      }

      const updatedProduct = { ...product, images: uploadedImageUrls };

      await axios.put(`${import.meta.env.VITE_API_URL}/api/products/admin/edit/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      await fetchProducts();
      toast.success(`Product successfully updated`);

      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (error) {
      console.log(error);
      setError("Could not update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center flex-col md:flex-row md:w-4/5 mx-auto bg-white admin">
      <form onSubmit={updateProduct} className="flex w-full md:flex-1 flex-col gap-4 mx-auto">
        <div className="form-group">
          <FaProductHunt className="fa" />
          <input name="name" value={product.name} onChange={handleChange} required />
          <label>Product Name</label>
        </div>
        <div className="form-group">
          <FaMoneyBill className="fa" />
          <input name="price" type="number" value={product.price} onChange={handleChange} required />
          <label>Price</label>
        </div>
        <div className="form-group">
          <FaStackExchange className="fa" />
          <input name="stock" type="number" value={product.stock} onChange={handleChange} required />
          <label>Stock</label>
        </div>
        <div className="form-group">
          <FaCalendarTimes className="fa" />
          <input name="category" value={product.category} onChange={handleChange} />
          <label>Category</label>
        </div>
        <div className="form-group">
          <FaCalendarTimes className="fa" />
          <input name="brand" value={product.brand} onChange={handleChange} />
          <label>Brand</label>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description..."
            className="border"
          />
        </div>
        <div className="form-group">
          <FaImage className="fa" />
          <input name="images" multiple type="file" onChange={handleImageChange} />
        </div>
        <div className="flex justify-center items-center gap-3">
          <button type="submit" className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Updating product...' : 'Update Product'}
          </button>
          <button type="button" className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded" onClick={() => navigate('/admin/products')}>
            Cancel
          </button>
        </div>
      </form>

      {imagePreviewUrls.length > 0 && (
        <div className="flex gap-2 flex-col h-[200px] mt-2">
          {imagePreviewUrls.map((url, index) => (
            <img key={index} src={url} alt="preview" className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};
