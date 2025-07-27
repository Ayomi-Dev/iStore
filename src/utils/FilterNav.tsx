import { useState, type FC } from "react";
import { useProductContext, type Products } from "../contexts/ProductsContext"

import { FaSearch } from "react-icons/fa";

interface FilterProp {
  filterByCategories: (category: string) => Products[]
}

export const FilterNav: FC<FilterProp> = ({ filterByCategories })  =>  {
    const { allProducts } = useProductContext();
    const [filterValue, setFilterValue] = useState<string>("");
    const categories = allProducts.map(product => {
        return product.category
    });
    
  return (  
    <div className="bg-white flex justify-between mb-2 items-center h-[80px] w-full fixed top-[60px] left-0 z-[70]">
        <div className="w-[40%] ">
            <input type="text" className="outline-none rounded-md border w-full" />
            <FaSearch />
        </div>
        <ul className="flex gap-4 w-[50%] h-full overflow-x-auto">
            <li className="bg-white active:text-pink-500 hover:text-pink-500 transition-[.7s] ease-in-out  w-[20%] h-full  text-sm cursor-pointer  inline-block rounded-[20px]"
                onClick={() => filterByCategories("all")}
            >
                <div className="flex justify-center h-full items-center">All Categories</div>
            </li>
            {categories.map((category, index) => {
                return(
                    <li key={index} className="bg-white w-[20%] h-full text-center text-sm transition-[0.7s] ease-in-out  cursor-pointer inline-block rounded-[20px]"
                        onClick={() => filterByCategories(category)}
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
