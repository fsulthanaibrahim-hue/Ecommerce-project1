// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import FilterBar from "../components/FilterBar";
// import fetchProducts from "../services/api";
  
// const Products = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const categoryFromURL = params.get("category") || "";

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState(categoryFromURL);
//   const [sort, setSort] = useState("");

//   useEffect(() => {
//     const loadProducts = async () => {
//       const data = await fetchProducts();
//       setProducts(data);
//     };
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     let result = [...products];
//     if (search.trim()) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
//     if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
//     if (sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
//     if (sort === "highToLow") result.sort((a, b) => b.price - a.price);
//     setFiltered(result);
//   }, [products, search, category, sort]);

//   return (
//     <div className="p-10">
//       <FilterBar 
//         search={search} setSearch={setSearch} 
//         category={category} setCategory={setCategory}
//         sort={sort} setSort={setSort} 
//       />
//       <h2 className="text-2xl font-bold mb-6">{category || "All Products"}</h2>
//       {filtered.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {filtered.map(product => <ProductCard key={product.id} product={product} />)}
//         </div>
//       )}
//     </div>
//   );
// };
// export default Products;






import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import fetchProducts from "../services/api";

const Products = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromURL = params.get("category") || "";

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFromURL);
  const [sort, setSort] = useState("");

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    loadProducts();
  }, []);

  // Filter and sort products whenever dependencies change
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      result = result.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sorting
    if (sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
    if (sort === "highToLow") result.sort((a, b) => b.price - a.price);

    setFiltered(result);
  }, [products, search, category, sort]);

  return (
    <div className="p-6 md:p-10">
      {/* Filter bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {/* Category title */}
      <h2 className="text-2xl font-bold mb-6">
        {category ? category : "All Products"}
      </h2>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
