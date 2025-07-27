import { useEffect, useState } from "react";
import { useProductContext} from "../contexts/ProductsContext"

import { FaSearch } from "react-icons/fa";

export const FilterNav = ()  =>  {
    const { allProducts, filterProducts, fetchProducts } = useProductContext();
    const [filterValue, setFilterValue] = useState<string>("");
    const categories = Array.from(new Set(allProducts.map(product => product.category )))

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
          const trimmed = filterValue.trim();

          if (trimmed.length > 0) {
            filterProducts({ name: trimmed });
          } else {
            fetchProducts(); // fallback to all products
          }
        }, 400); // debounce time
        
        return () => clearTimeout(delayDebounce);
    }, [filterValue]);


    const handleCategory = (category: string) => {
        const selectedCategory = category === "all" ? undefined : category;
        filterProducts({category: selectedCategory})
    }
   
    
  return (  
    <div className="bg-white flex justify-between mb-2 items-center h-[80px] w-full fixed top-[60px] left-0 z-[70]">
        <div className="w-[40%] ">
            <input type="text" className="outline-none rounded-md border w-full" value={filterValue}
                onChange = {(e) => setFilterValue(e.target.value)}
            />
            <FaSearch />
        </div>
        <ul className="flex gap-4 w-[50%] h-full overflow-x-auto">
            <li className="bg-white active:text-pink-500 hover:text-pink-500 transition-[.7s] ease-in-out  w-[20%] h-full  text-sm cursor-pointer  inline-block rounded-[20px]"
                onClick={() => handleCategory("all")}
            >
                <div className="flex justify-center h-full items-center">All Categories</div>
            </li>
            {categories.map((category, index) => {
                return(
                    <li key={index} className="bg-white w-[20%] h-full text-center text-sm transition-[0.7s] ease-in-out  cursor-pointer inline-block rounded-[20px]"
                        onClick={() => handleCategory(category)}
                    >
                        <div className="flex h-full justify-center items-center">
                            <span className="hover:text-pink-500">{category}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
