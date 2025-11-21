// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import FilterBar from "../components/FilterBar";
// import fetchProducts from "../services/api";
  
// const Products = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);

//   const categoryMap = {
//     1: "Men",
//     2: "Women",
//     3: "Kids"
//   };

//   const rawCategory = params.get("category");

//   const categoryFromURL = categoryMap[rawCategory] || rawCategory || "";

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

//     if (search.trim()) {
//       result = result.filter((p) => 
//        p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category) {
//       result = result.filter(
//         (p) => p.category.toLowerCase() === category.toLowerCase()
//       );
//     }

//     if (sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
//     if (sort === "highToLow") result.sort((a, b) => b.price - a.price);

//     setFiltered(result);
//   }, [products, search, category, sort]);

//   return (
//     <div className="p-10 mt-10">
//       <FilterBar 
//         search={search} 
//         setSearch={setSearch} 
//         category={category} 
//         setCategory={setCategory}
//         sort={sort} 
//         setSort={setSort} 
//       />
//       <h2 className="text-2xl font-bold mb-6">{category || "All Products"}</h2>
//       {filtered.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
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

  const categoryMap = {
    1: "Men",
    2: "Women",
    3: "Kids",
  };

  const rawCategory = params.get("category");
  const categoryFromURL = categoryMap[rawCategory] || rawCategory || "";

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFromURL);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchProducts();
        if (!data || !Array.isArray(data)) {
          setError("Invalid data received from server");
          setProducts([]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        (p.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(
        (p) => (p.category || "").toLowerCase() === category.toLowerCase()
      );
    }

    if (sort === "lowToHigh") result.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "highToLow") result.sort((a, b) => (b.price || 0) - (a.price || 0));

    setFiltered(result);
  }, [products, search, category, sort]);

  if (loading) return <p className="p-10">Loading products...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

  return (
    <div className="p-10 mt-10">
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
      <h2 className="text-2xl font-bold mb-6">{category || "All Products"}</h2>
      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id ?? "",
                name: product.name ?? "Unnamed Product",
                price: product.price ?? 0,
                category: product.category ?? "Unknown",
                image: product.image ?? "",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
