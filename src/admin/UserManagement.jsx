import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:5000";

const UsersManagement = ({ onRefresh }) => {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");

  const load = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(q.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(q.toLowerCase())
  );

  const toggleBlock = async (user) => {
    try {
      await axios.patch(`${API}/users/${user.id}`, { blocked: !user.blocked });
      toast.success(user.blocked ? "Unblocked" : "Blocked");
      load();
      onRefresh?.();
    } catch (e) {
      console.error(e);
      toast.error("Action failed");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[70vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">Users</h2>
        <input
          placeholder="Search by name or email"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["Name", "Email", "Role", "Blocked", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-xs text-gray-300 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2 text-gray-300">{u.email}</td>
                <td className="px-4 py-2 text-yellow-400">{u.role ?? "User"}</td>
                <td className="px-4 py-2">{u.blocked ? "Yes" : "No"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleBlock(u)}
                    className="text-indigo-400 hover:text-indigo-600 mr-3"
                  >
                    {u.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
