// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: "", price: "", category: "" });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/products");
//     setProducts(res.data);
//   };

//   const handleAddProduct = async () => {
//     await axios.post("http://localhost:5000/products", form);
//     setForm({ name: "", price: "", category: "" });
//     fetchProducts();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/products/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Manage Products</h2>

//       <div className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         />
//         <button onClick={handleAddProduct} className="bg-blue-600 text-white px-4 py-2">
//           Add
//         </button>
//       </div>

//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Price</th>
//             <th className="border p-2">Category</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p.id}>
//               <td className="border p-2">{p.name}</td>
//               <td className="border p-2">{p.price}</td>
//               <td className="border p-2">{p.category}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleDelete(p.id)}
//                   className="bg-red-600 text-white px-2 py-1"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminProducts;




import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";

// Example fetch from db.json via json-server
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/products") // replace port/path with your json-server
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Product Management</h2>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by ID, Name, or Category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pl-10 pr-4 w-full bg-gray-700 border border-gray-600 rounded-lg text-sm text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition duration-200 w-full sm:w-auto justify-center">
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["ID", "Name", "Category", "Stock", "Price"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">{p.id}</td>
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="px-6 py-4">${p.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
