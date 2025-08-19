import { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductsContext";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const FilterNav = () => {
  const { allProducts, filterProducts, fetchProducts, setFilteredProducts } = useProductContext();
  const [filterValue, setFilterValue] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [price, setPrice] = useState({ min: "", max: "" });
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>('all')

  const categories = Array.from(new Set(allProducts.map((product) => product.category)));
  const brands = Array.from(new Set(allProducts.map((product) => product.brand))).filter(Boolean); // Filter out any undefined or empty brands

  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = filterValue.trim();
      // console.log('searchvalue:', trimmed.length)
      if (trimmed.length === 0) {
        fetchProducts(); // fallback
        setFilteredProducts(allProducts)
      } else {
        filterProducts({ name: trimmed });
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [filterValue]);

  const handleCategory = (category: string) => {
    const selected = category === "all" ? undefined : category;
    filterProducts({ category: selected });
    setSelectedCategory(selected || 'all')
    navigate("/products");
  };
  
  const handleBrand = (brand: string) => {
    const selected = brand === "all" ? undefined : brand;
    filterProducts({brand: selected});
    setSelectedBrand(selected || 'all');
    navigate(`/products?brand=${selected || 'all'}`)
  }

  const applyFilters = () => {
    filterProducts({
      name: filterValue.trim(),
      category: selectedCategory,
      min: price.min, 
      max: price.max,
      rating: selectedRating?.toString(),
      brand: selectedBrand,
    });
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilterValue("");
    setPrice({ min: "", max: "" });
    setSelectedRating(null);
    setSelectedCategory("all");
    fetchProducts();
    setShowFilters(false);
  };

  return (
    <div className={`w-full relative px-1 py-3 bg-inherit ${showFilters ? 'md:top-[80px] top-[200px]' : 'top-0'}`}>
      <div className="flex items-center rounded-md shadow-md w-full px-1 gap-2">
        <input
          type="text"
          className="w-full px-3 py-2 outline-none"
          placeholder="Search products..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button onClick={() => setShowFilters(!showFilters)}>
          <FaFilter className={`${!showFilters ? 'text-black' : "text-pink-500"} cursor-pointer`}  />
        </button>
      </div> 
     

      {showFilters && (
        <div className="top-4 rounded-md p-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]  gap-4">
          <div>
            <label className="font-bold text-pink-500 text-sm">Category</label>
            <ul className="mt-2 space-y-1">
              <li onClick={() => handleCategory("all")} className={` cursor-pointer text-sm hover:text-pink-600`}>All Products</li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleCategory(category)}
                  className={`${selectedCategory === category ? 'font-bold text-pink-600' : ''} cursor-pointer text-sm hover:text-pink-600`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="font-bold text-pink-500 text-sm">Price Range</label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                value={price.min}
                onChange={(e) => setPrice({ ...price, min: e.target.value })}
                className="w-[80px] px-2 py-1 border rounded"
              />
              <span>—</span>
              <input
                type="number"
                placeholder="Max"
                value={price.max}
                onChange={(e) => setPrice({ ...price, max: e.target.value })}
                className="w-[80px] px-2 py-1 border rounded"
              />
            </div>
          </div>

         
          <div>
            <label className="font-bold text-pink-500 text-sm">Rating</label>
            <ul className="mt-2 space-y-1 text-sm">
              {[4, 3, 2, 1].map((r) => (
                <li
                  key={r}
                  onClick={() => setSelectedRating(r)}
                  className={`cursor-pointer flex items-center gap-1 ${selectedRating === r ? "text-pink-600 font-semibold" : "hover:text-pink-600"}`}
                >
                  {"★".repeat(r)} & up
                </li>
              ))}
            </ul>
          </div>

          {brands.length > 0 && (
            <div>
              <label className="font-bold text-pink-500 text-sm">Brand</label>
              <ul className="mt-2 space-y-1 text-sm">
                <li onClick={() => handleBrand("all")} className={` cursor-pointer text-sm hover:text-pink-600`}>All brands</li>

                {brands.map((brand, index) => (
                  <li key={index} onClick={() => handleBrand(brand)} className={`${selectedBrand === brand ? "font-bold text-pink-600" : ""} cursor-pointer hover:text-pink-600`}>{brand}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showFilters && (
        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={clearFilters}
            className="text-sm px-4 py-2 border rounded-md hover:bg-red-100"
          >
            <FaTimes className="inline mr-1" /> Clear
          </button>
          <button
            onClick={applyFilters}
            className="text-sm px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
