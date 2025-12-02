
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [userOrders, setUserOrders] = useState([]);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
    },
  });
  const [imagePreview, setImagePreview] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!storedUser || !storedUser.id) {
      showToast("Please login first!", "error");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${storedUser.id}`);
        if (!res.ok) throw new Error("User not found!");
        const data = await res.json();

        // Set default values if missing
        const processedData = {
          ...data,
          createAt: data.createAt || new Date().toISOString(),
          status: data.status || "active",
          orders: data.orders || []
        };

        setUserData(processedData);
        setFormData({
          name: processedData.name || "",
          email: processedData.email || "",
          phone: processedData.phone || "",
          profileImage: processedData.profileImage || "",
          address: processedData.address || {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "India",
          },
        });
        setImagePreview(processedData.profileImage || null);
      } catch {
        showToast("Failed to load profile!", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image size should be less than 5MB", "error");
        return;
      }

      if (!file.type.startsWith("image/")) {
        showToast("Please select an image file", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData((prev) => ({ ...prev, profileImage: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleSave = async () => {
    if (!userData?.id) return showToast("Invalid user!", "error");

    try {
      const updatedUser = { 
        ...userData, 
        ...formData,
        createAt: userData.createAt,
        status: userData.status,
        orders: userData.orders
      };

      const res = await fetch(`http://localhost:5000/users/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();

      setUserData(data);
      setImagePreview(data.profileImage || null);
      localStorage.setItem("loggedInUser", JSON.stringify(data));

      setEditMode(false);
      showToast("Profile updated successfully!");
    } catch {
      showToast("Save failed!", "error");
    }
  };

  // Helper function to format date
  const formatMemberSince = (dateString) => {
    if (!dateString) return new Date().getFullYear();
    const date = new Date(dateString);
    return date.getFullYear();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {toast && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-gradient-to-r from-gray-600 to-gray-600 text-white pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={
                  imagePreview ||
                  userData?.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                alt="profile"
              />
              
              <label
                htmlFor="profileImageInput"
                className="absolute bottom-0 right-0 w-10 h-10 bg-gray-500 hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all transform hover:scale-110 border-4 border-white"
              >
                <span className="text-white text-xl">📷</span>
              </label>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            
            {imagePreview && imagePreview !== "https://cdn-icons-png.flaticon.com/512/3177/3177440.png" && (
              <button
                onClick={removeImage}
                className="mt-3 px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-full transition"
              >
                Remove Photo
              </button>
            )}
            
            <h1 className="text-4xl font-bold mt-6">{userData?.name}</h1>
            <p className="text-purple-100 mt-2 text-lg">{userData?.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-semibold text-purple-600">
                    {formatMemberSince(userData?.createAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="font-semibold text-blue-600">
                    {userData?.orders?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className="font-semibold text-green-600">
                    {userData?.status ? 
                      userData.status.charAt(0).toUpperCase() + userData.status.slice(1) 
                      : "Active"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-3"
                >
                  <span className="text-xl">📦</span>
                  <span className="text-sm font-medium text-gray-700">View Orders</span>
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-3"
                >
                  <span className="text-xl">🛒</span>
                  <span className="text-sm font-medium text-gray-700">Go to Cart</span>
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-3"
                >
                  <span className="text-xl">🏠</span>
                  <span className="text-sm font-medium text-gray-700">Home</span>
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-3"
                >
                  <span className="text-xl">🛍️</span>
                  <span className="text-sm font-medium text-gray-700">Products</span>
                </button>  
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {editMode ? (
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{userData?.name || "Not provided"}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {editMode ? (
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{userData?.email || "Not provided"}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {editMode ? (
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{userData?.phone || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span>📍</span> Address Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      {editMode ? (
                        <input
                          name="street"
                          value={formData.address.street}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter street address"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">
                          {userData?.address?.street || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        {editMode ? (
                          <input
                            name="city"
                            value={formData.address.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="City"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">
                            {userData?.address?.city || "Not provided"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        {editMode ? (
                          <input
                            name="state"
                            value={formData.address.state}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="State"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">
                            {userData?.address?.state || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        {editMode ? (
                          <input
                            name="zip"
                            value={formData.address.zip}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="ZIP"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">
                            {userData?.address?.zip || "Not provided"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        {editMode ? (
                          <input
                            name="country"
                            value={formData.address.country}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Country"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">
                            {userData?.address?.country || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {editMode && (
                  <div className="flex gap-4 pt-6 border-t">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                      💾 Save Changes
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      ✕ Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Profile;



