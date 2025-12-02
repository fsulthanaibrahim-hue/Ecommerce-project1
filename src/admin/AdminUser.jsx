import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash, FaEye, FaBan, FaCheck } from "react-icons/fa";

const API_URL = "http://localhost:5000/users";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  

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
        <thead className="bg-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
          users.map((user) => (
            <tr key={user._id} className="border-b border-gray-700">
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

                {user.role !== "admin" ? (
                  <>
                   <button 
                     className={`${
                      user.blocked
                       ? "text-green-600 hover:text-green-800"
                       : "text-red-600 hover:text-red-800" 
                     }`}
                     onClick={() => handleBlockToggle(user._id, user.blocked)}
                   >
                    {user.blocked ? <FaCheck size={20} /> : <FaBan size={20} />}
                   </button>

                   <button 
                     className="text-red-600 hover:text-red-800"
                     onClick={() => handleDelete(user._id)}
                   >
                    <FaTrash size={20} />
                   </button>  
                  </>
                ) : (
                  <span className="text-gray-400 italic">Admin</span>
                )}
              </td>
            </tr>
          ))
        )}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">        
          <div className="bg-gray-800 border border-gray-600 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">User Details</h3>
           <div className="flex justify-center mb-4">
            <img 
              src={selectedUser.image}
              alt="image"
              className="w-24 h-24 rounded-full border-2 border-gray-500 shadow"
            />
           </div>    

            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Role:</b> {selectedUser.role || "user"}</p>
            <p className="mb-3">
              <b>Status:</b>{" "}
              {selectedUser.blocked ? (
                <span className="text-red-400 font-semibold">Blocked</span>
              ) : (
                <span className="text-green-400 font-semibold">Active</span>
              )}
            </p>

            <button 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
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






