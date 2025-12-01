import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", category: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products!");
    }
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price || !form.category) {
      alert("Please fill all fields");
      return;
    }
    await axios.post("http://localhost:5000/products", form);
    toast.success("Product Added Successfully!");
    setForm({ name: "", price: "", category: "" });
    fetchProducts();
  };

  const handleDelete = async (_id) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Delete this product?</span>

        <button 
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={async () => {
            await axios.delete(`http://localhost:5000/products/${_id}`);
            toast.success("Product deleted!");
            toast.dismiss(t.id);
            fetchProducts();
          }} 
        >
          Yes
        </button>  

        <button 
          className="bg-gray-400 text-black px-3 py-1 rounded"
          onClick={() => toast.dismiss(t.id)}
        >
          No
        </button>  
      </div>
    ));
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
    });
  };

  const cancelEdit = () => setEditId(null);

  const handleEdit = async (_id) => {
    if (!editForm.name || !editForm.price || !editForm.category) {
      toast.error("Please fill all fields");
      return;
    }
    await axios.put(`http://localhost:5000/products/${_id}`, editForm);
    toast.success("Product Updated Successfully ✔");
    setEditId(null);
    fetchProducts();
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Products</h2>

      {/* Add Product */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-3 py-2 border rounded w-40"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="px-3 py-2 border rounded w-28"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="px-3 py-2 border rounded w-40"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Name</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="border p-3">
                  {editId === p._id ? (
                    <input
                      className="border px-2 py-1 rounded"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  ) : p.name}
                </td>

                <td className="border p-3">
                  {editId === p._id ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                    />
                  ) : `₹ ${p.price}`}
                </td>

                <td className="border p-3">
                  {editId === p._id ? (
                    <input
                      className="border px-2 py-1 rounded"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                    />
                  ) : p.category}
                </td>

                <td className="border p-3">
                  {editId === p._id ? (
                    <>
                      <button
                        onClick={() => handleEdit(p._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      {/* FIXED DELETE ID HERE 👇 */}
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
