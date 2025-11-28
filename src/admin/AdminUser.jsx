import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Users fetch error:", err));
  }, []);

  return (
    <Paper sx={{ padding: 3, background: "#1e1e1e" }}>
      <Typography variant="h5" color="white" gutterBottom>Users</Typography>

      <Table sx={{ color: "white" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Email</TableCell>
            <TableCell sx={{ color: "white" }}>Role</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user, i) => (
            <TableRow key={i}>
              <TableCell sx={{ color: "white" }}>{user.name}</TableCell>
              <TableCell sx={{ color: "white" }}>{user.email}</TableCell>
              <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminUsers;










// import React from "react";
// import { Trash2, Edit2 } from "lucide-react";

// export default function UsersPage({ users, onDelete, onToggleBlock }) {
//   if (!Array.isArray(users)) return <p className="text-white">Loading users...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
//       <div className="overflow-x-auto bg-gray-800 p-3 rounded">
//         <table className="w-full text-left">
//           <thead className="text-sm text-gray-400">
//             <tr>
//               <th className="p-3">ID</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id} className="border-t border-gray-700">
//                 <td className="p-3 text-sm">{u.id}</td>
//                 <td className="p-3 text-sm">{u.name}</td>
//                 <td className="p-3 text-sm">{u.email}</td>
//                 <td className="p-3 text-sm">{u.status ?? (u.blocked ? "blocked" : "active")}</td>
//                 <td className="p-3 text-sm">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => onToggleBlock(u.id)}
//                       className="px-2 py-1 rounded bg-indigo-600 text-white text-sm"
//                     >
//                       <Edit2 className="w-4 h-4 inline-block mr-1" />
//                       Toggle
//                     </button>
//                     <button
//                       onClick={() => onDelete(u.id)}
//                       className="px-2 py-1 rounded bg-red-600 text-white text-sm"
//                     >
//                       <Trash2 className="w-4 h-4 inline-block mr-1" />
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }












