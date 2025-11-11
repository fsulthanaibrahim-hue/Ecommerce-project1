import React from "react";

const FilterBar = ({ search, setSearch, category, setCategory, sort, setSort }) => {
    return (
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
           <input 
             type="text"
             placeholder="Search products..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="border p-2 rounded-lg w-1/3"
            />

            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded-lg ml-130"
            >
                <option value="">All Categories</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="kids">Kids</option>
            </select>   

            <select
               value={sort}
               onChange={(e) => setSort(e.target.value)}
               className="border p-2 rounded-lg"
            >
                <option value="">Sort by</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
            </select>   
        </div>
    );
};
export default FilterBar;





