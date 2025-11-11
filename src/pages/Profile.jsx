import React, { useState } from "react";

const Profile = () => {
    const [user, setUser] = useState({
        name: "Sulthana",
        email: "sulthana@example.com",
        address: "Calicut, Kerala",
        Phone: "+91 9876543210",
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
      <div className="flex flex-col items-center py-10 px-4 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Profile</h2>

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
              alt="avatar"
              className="w-24 h-24 rounded-full mb-4"
            />

            <div className="w-full text-left space-y-4">
              <div>
                <label className="text-gray-600">Name</label>
                <input 
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-lg p-2 mt-1"
                />  
              </div>  

              <div>
                <label className="text-gray-600">Email</label>
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-lg p-2 mt-1"
                />  
              </div>

              <div>
                <label className="text-gray-600">Address</label> 
                <input
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-lg p-2 mt-1"
                />  
              </div>

              <div>
                <label className="text-gray-600">Phone</label>
                <input
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border rounded-lg p-2 mt-1"
                />  
              </div>
            </div>  

            <div className="mt-6 flex justify-center gap-4">
               {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    Edit Profile
                </button>  
               ) : (
                <button 
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    Save
                </button>  
               )} 

               <button
                 onClick={() => alert("Logged out!")}
                 className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    Logout
                </button>  
            </div> 
          </div>  
        </div> 
      </div>
    );
};
export default Profile;




