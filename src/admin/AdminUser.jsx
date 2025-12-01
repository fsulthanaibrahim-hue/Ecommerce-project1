import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "http://localhost:5000/users";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const res = await fetch(`${API_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !isBlocked }),
      });
      const data = await res.json();

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, blocked: !isBlocked } : u))
      );

      toast.dismiss();
      toast.success(`User ${!isBlocked ? "blocked" : "unblocked"} successfully`);
    } catch (err) {
      toast.dismiss()
      toast.error("Something went wrong");
      console.error(err);
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
              <td className="py-2 px-4">{user.blocked ? "Blocked" : "Active"}</td>
              <td className="py-2 px-4">
                <button
                  className={`px-3 py-1 rounded ${
                    user.blocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                  onClick={() => handleBlockToggle(user.id, user.blocked)}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
