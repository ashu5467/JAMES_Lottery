import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { username, logout } = useAuth(); // Destructure logout from AuthContext
  const navigate = useNavigate(); // Initialize the navigate function
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    profilePhoto: null,
  });
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", { params: { username } });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/purchase-history", { params: { username } });
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchProfileData();
    fetchPurchaseHistory();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);
    formData.append("phone", profileData.phone);
    formData.append("age", profileData.age);
    if (profileData.profilePhoto) {
      formData.append("profilePhoto", profileData.profilePhoto);
    }

    try {
      await axios.put("http://localhost:5000/api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Updated logout function
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
          {profileData.profilePhoto ? (
            <img src={URL.createObjectURL(profileData.profilePhoto)} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-500 flex items-center justify-center h-full">No Photo</span>
          )}
        </div>
        <h2 className="text-3xl font-bold text-blue-800 mb-2">{profileData.name || "User Name"}</h2>
        <p className="text-lg text-gray-600">{profileData.email || "Email not provided"}</p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-4">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Profile Details</h3>
        <p className="text-lg text-gray-700 mb-2"><strong>Phone:</strong> {profileData.phone || "Not provided"}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Age:</strong> {profileData.age || "Not provided"}</p>
      </div>

      {isEditing ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <button onClick={handleSave} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Save Changes
          </button>
          <button onClick={() => setIsEditing(false)} className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
            Cancel
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button onClick={() => setIsEditing(true)} className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      )}

      {/* Purchase History Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner mt-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Purchase History</h3>
        {purchaseHistory.length > 0 ? (
          <ul className="space-y-2">
            {purchaseHistory.map((purchase, index) => (
              <li key={index} className="bg-white p-4 rounded-md shadow">
                <p><strong>Lottery:</strong> {purchase.lotteryName}</p>
                <p><strong>Date:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ${purchase.amount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No purchase history available.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="text-center mt-6">
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
