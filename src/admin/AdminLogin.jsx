// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // SIMPLE DEMO LOGIN
//     if (email === "admin@gmail.com" && pass === "admin123") {
//       localStorage.setItem("admin", "true"); // store that admin is logged in
//       navigate("/admin/dashboard"); // go to admin dashboard
//     } else {
//       alert("Wrong admin email or password");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "100px auto" }}>
//       <h2>Admin Login</h2>

//       <input
//         type="email"
//         placeholder="Admin Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input
//         type="password"
//         placeholder="Admin Password"
//         value={pass}
//         onChange={(e) => setPass(e.target.value)}
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <button
//         onClick={handleLogin}
//         style={{
//           width: "100%",
//           padding: 10,
//           background: "black",
//           color: "white",
//         }}
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default AdminLogin;
