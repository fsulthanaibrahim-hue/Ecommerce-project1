import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash, FaEye, FaBan, FaCheck } from "react-icons/fa";

const API_URL = "http://localhost:5000/users";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
        await fetch(`${API_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !isBlocked }),
      });

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, blocked: !isBlocked } : u))
      );

      toast.success(`User ${!isBlocked ? "blocked" : "unblocked"} successfully`);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure want to delete this user?")) return;

    try {
      await fetch(`${API_URL}/${userId}`, { method: "DELETE" });

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.blocked ? (
                <span className="text-red-600 font-semibold">Blocked</span>
              ) : (
                <span className="text-green-600 font-semibold">Active</span>
              )}
              </td>

              <td className="py-2 px-4 flex items-center justify-center gap-4">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedUser(user)}
                >
                  <FaEye size={18} />
                </button>

                <button 
                  className={`${
                    user.blocked ? "text-green-600 hover:text-green-800" : "text-red-600 hover:text-red:800"
                  }`}
                   onClick={() => handleBlockToggle(user.id, user.blocked)}
                >
                  {user.blocked ? <FaCheck size={18} /> : <FaBan size={18} />}
                </button>  

                <button 
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash size={18} />
                </button> 

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-3">User Details</h3>
            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Status:</b> {selectedUser.blocked ? "Blocked" : "Active"}</p>

            <button 
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>  
          </div>
        </div>  
      )}
    </div>
  );
}
