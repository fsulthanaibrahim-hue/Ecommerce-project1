import React, { useState, useEffect } from "react";
import { User, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
    },
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!storedUser || !storedUser.id) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${storedUser.id}`);
        if (!res.ok) throw new Error("User not found!");

        const data = await res.json();
        setUserData(data);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "India",
          },
        });

      } catch (e) {
        toast.error("Failed to load profile!");
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/order?userId=${storedUser.id}`);
        const data = await res.json();
        setOrders(data || []);
      } catch (error) {
        toast.error("Failed to load orders!");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUser();
    fetchOrders();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "city", "state", "zip", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!userData?.id) return toast.error("Invalid user!");

    try {
      const updatedUser = { ...userData, ...formData };

      const res = await fetch(`http://localhost:5000/users/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();

      setUserData(data);
      localStorage.setItem("loggedInUser", JSON.stringify(data));

      setEditMode(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Save failed!");
    }
  };  

  const toggleProducts = (id) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex flex-col items-center mt-10 px-4 pb-20">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <User className="text-purple-700" /> My Profile
      </h2>

      <div className="border p-6 mt-6 rounded-md w-full max-w-md shadow-md bg-white">
        <div className="space-y-3">

          <div>
            <label className="font-semibold">Name:</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded w-full p-1 mt-1"
                placeholder="Enter your name"
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Email:</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded w-full p-1 mt-1"
                placeholder="Enter your email"
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Phone:</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded w-full p-1 mt-1"
                placeholder="Enter phone number"
              />
            ) : (
              <p>{userData.phone || "Not added"}</p>
            )}
          </div>

          <div>
            <label className="font-semibold flex items-center gap-1">
              <MapPin size={16} /> Address:
            </label>

            {editMode ? (
              <>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="Street"
                  className="border rounded w-full p-1 mt-1"
                />

                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="flex-1 border rounded p-1 w-full"
                  />

                  <input
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="flex-1 border rounded p-1 w-full"
                  />
                </div>

                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    name="zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                    placeholder="ZIP"
                    className="flex-1 border rounded p-1 w-full"
                  />

                  <input
                    type="text"
                    name="country"
                    value={formData.address.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="flex-1 border rounded p-1 w-full"
                  />
                </div>
              </>
            ) : (
              <p>
                {`${userData.address?.street || ""}, ${
                  userData.address?.city || ""
                }, ${userData.address?.state || ""}, ${
                  userData.address?.zip || ""
                }, ${userData.address?.country || "India"}`}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
              >
                Edit Profile
              </button>

              <button
                onClick={() =>
                  navigate("/checkout", { state: { address: formData.address } })
                }
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
              >
                Go to Checkout
              </button>
            </>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10">My Orders</h2>

      {loadingOrders ? (
        <p className="mt-4">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="mt-4">No orders yet.</p>
      ) : (
        <div className="mt-4 w-full max-w-xl space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow bg-white">
              <div className="flex justify-between items-center">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>

                <button 
                  onClick={() => toggleProducts(order.id)}
                  className="text-purple-700 font-semibold"
                >
                  {expandedOrders[order.id] ? "Hide" : "View"}
                </button>
              </div>   

              <p className="mt-2 text-sm text-gray-700">
                <strong>Total:</strong> ₹{order.total}
              </p>

                  {expandedOrders[order.id] && (
                    <div className="mt-3">
                      {order.products?.map((item, index) => (
                        <div key={index} className="border-b py-2">
                          <p>{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} - ₹{item.price}
                          </p>
                        </div>  
                      ))}
                    </div>
                  )}
              </div>
          ))}
        </div>  
      )}
    </div>
  );
};

export default Profile;





