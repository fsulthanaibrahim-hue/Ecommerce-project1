import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [form ,setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     console.log("Registered:", name, email, password);
    //     alert("Registered successfully!");
    // };
    const handleChange = (e) => {
      setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const { name, email, password } = form;

      if(!email || !password) {
        toast.error("Please fill all fields!");
        return;
      }
      try {
        const res = await fetch (`http://localhost:5000/users?email=${email}`);
        const existingUsers= await res.json();

        if(existingUsers.length > 0) {
          toast.error("User already exists!");
          return;
        }
        const newUser = { name, email, password };

        const addUser = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if(!addUser.ok) {
          throw new Error("Failed to register");
        }

        toast.success("Registration successful!");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        navigate("/products");
      } catch (err) {
        console.error("Error registering user:", err);
        toast.error("Something went wrong!")
      }
    };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   // setLoading(true);

    //     const { name, email, password } = form;


    //     if(!name || !email || !password) {
    //       toast.error("Please fill all fields");
    //       setLoading(false);
    //       return;
    //     }

    //   try{  
    //     const res = await fetch(`http://localhost:5000/users?email=${email}`);
    //     const existingUsers = await res.json();

    //     if(existingUsers.length > 0) {
    //       toast.error("User already exists!");
    //       // setLoading(false);
    //       return;
    //     }

    //     const postRes = await fetch("http://localhost:5000/users", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ name, email, password }),
    //     });

    //     if(!postRes.ok) {
    //       // const text = await res.text();
    //       // console.error("Server responded with error:", res.status, text);
    //       throw new Error("Failed to register user");
    //     }

    //     const newUser = await postRes.json();
    //     // console.log("Registered user:", data);

    //     localStorage.setItem("user", JSON.stringify(newUser));
    //     localStorage.setItem("isLoggedIn", "true");

    //     toast.success("Registered successfully!");
    //     navigate("/login");
    //   } catch (err) {
    //     console.error("Registration failed:", err);
    //     toast.error("Something went wrong!   Please try again.");
    //   } finally {
    //     setLoading(false);
    //   } 
    // };  

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:ring-1"
                  value={form.name}
                  onChange={handleChange}
                  required
                />  

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:ring-1"
                  value={form.email}
                  onChange={handleChange}
                  required 
                />  

               <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:ring-1 pr-10"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)} 
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>   
               </div>

              <button 
                 type="submit"
                 className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
                 disabled={loading}
               >
                {loading ? "Registering..." : "Register"}
               </button>  
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-black font-semibold hover:underline">
                   Login here
                </Link>
            </p>
          </div>   
        </div>
    );
};
export default Register;



