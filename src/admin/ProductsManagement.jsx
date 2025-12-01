import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error("Failed to fetch products!");
      }
    };
    

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.cat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    toast("Add product page coming soon!");
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Delete this product?</span>

        <button 
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={async () => {
            await fetch(`http://localhost:5000/products/${id}`, {
              method: "DELETE",
            });
            toast.success("Product deleted successfully!");
            toast.dismiss(t.id);
            fetchProducts();
          }}
        >
          Yes
        </button>  

        <button 
          className="bg-gray-300 text-black px-3 py-1 rounded"
          onClick={() => toast.dismiss(t.id)}
        >
          No
        </button>  
      </div>
    ));
  };

  const handleEdit = (id) => {
    toast("Edit functionally coming soon!");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Products Overview</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by ID, Name, or Category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pl-10 pr-4 w-full bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition duration-200 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["ID", "Product Name", "Category", "Stock", "Price", "Status", "Action"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700 rounded-t-lg"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-700 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-yellow-400">{product._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.cat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "In Stock"
                          ? "bg-green-900/50 text-green-300"
                          : product.status === "Out of Stock"
                          ? "bg-red-900/50 text-red-300"
                          : "bg-yellow-900/50 text-yellow-300"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-3">
                    <button 
                      onClick={() => handleEdit(product._id)}
                      className="text-blue-400 hover:text-bue-300 flex items-center gap-1"
                    >
                      <Edit size={17} /> Edit
                    </button>  

                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash size={17} /> Delete
                    </button>  
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500 text-lg italic">
                  No products found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManagement;




