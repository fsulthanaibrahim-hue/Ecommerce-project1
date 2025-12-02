import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

const API = "http://localhost:5000";

const UsersManagement = ({ onRefresh }) => {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Load all users
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users by search query
  const filteredUsers = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(q.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(q.toLowerCase())
  );

  // Toggle block/unblock
  const toggleBlock = async (user) => {
    try {
      await axios.patch(`${API}/users/${user.id}`, { blocked: !user.blocked });
      toast.success(user.blocked ? "User unblocked" : "User blocked");
      loadUsers();
      onRefresh?.();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[70vh]">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-yellow-400">Users Management</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {loading ? (
        <div className="text-white text-center py-10">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-700">
                {["Name", "Email", "Role", "Blocked", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-700 transition duration-150 ${
                      user.blocked ? "opacity-80 line-through" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-white font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-gray-300">{user.email}</td>
                    <td className="px-4 py-3 text-yellow-400">{user.role || "User"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.blocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.blocked ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                      >
                        <FaEye size={20} />
                      </button>

                      <button 
                        onClick={() => toggleBlock(user)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          user.blocked
                           ? "bg-green-600 hover:bg-green-700 text-white"
                           : "bg-red-600 hover:bg-red-700 text-white"
                        } transtion`}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>  
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 p-6 rounded-xl w-96 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">User Details</h3>
            <p className="text-gray-300"><b>Name:</b> {selectedUser.name}</p>
            <p className="text-gray-300"><b>Email:</b> {selectedUser.email}</p>
            <p className="text-gray-300"><b>Role:</b> {selectedUser.role || "User"}</p>
            <p className="text-gray-300">
              <b>Status:</b> {selectedUser.blocked ? "Blocked" : "Active"}
            </p>

            <button 
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md w-full"
            >
              Close
            </button>  
          </div>
        </div>  
      )}
    </div>  
  );
};

export default UsersManagement;


