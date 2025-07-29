import { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductsContext";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const FilterNav = () => {
  const { allProducts, filterProducts, fetchProducts } = useProductContext();
  const [filterValue, setFilterValue] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [price, setPrice] = useState({ min: "", max: "" });
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = Array.from(new Set(allProducts.map((product) => product.category)));
  const brands = Array.from(new Set(allProducts.map((p) => p.brand))).filter(Boolean);

  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = filterValue.trim();
      if (trimmed.length > 0) {
        filterProducts({ name: trimmed });
      } else {
        fetchProducts(); // fallback
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [filterValue]);

  const handleCategory = (category: string) => {
    const selected = category === "all" ? undefined : category;
    filterProducts({ category: selected });
    console.log(selectedCategory)
    setSelectedCategory(selected || 'all')
    navigate("/products");
    // setShowFilters(false);
  };

  const applyFilters = () => {
    filterProducts({
      name: filterValue.trim(),
      category: selectedCategory,
      min: price.min, 
      max: price.max,
      rating: selectedRating?.toString(),
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
          <FaFilter className="text-pink-500 cursor-pointer"  />
        </button>
      </div>
     

      {showFilters && (
        <div className="top-4 rounded-md p-4 grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="font-semibold text-sm">Category</label>
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

          {/* Price */}
          <div>
            <label className="font-semibold text-sm">Price Range</label>
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

          {/* Ratings */}
          <div>
            <label className="font-semibold text-sm">Rating</label>
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

          {/* Brand (optional) */}
          {brands.length > 0 && (
            <div>
              <label className="font-semibold text-sm">Brand</label>
              <ul className="mt-2 space-y-1 text-sm">
                {brands.map((brand, i) => (
                  <li key={i} className="cursor-pointer hover:text-pink-600">{brand}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showFilters && (
        <div className="flex gap-4 mt-4 justify-end">
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
