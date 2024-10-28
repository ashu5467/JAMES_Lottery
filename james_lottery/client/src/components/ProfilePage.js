import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { username } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    profilePhoto: null,
  });
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
    fetchProfileData();
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

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {profileData.profilePhoto ? (
            <img src={URL.createObjectURL(profileData.profilePhoto)} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-500 flex items-center justify-center h-full">No Photo</span>
          )}
        </div>
      </div>

      {isEditing ? (
        <>
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
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">{profileData.name || "Your Profile"}</h2>
          <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {profileData.email}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Phone:</strong> {profileData.phone}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Age:</strong> {profileData.age}</p>
          <button onClick={() => setIsEditing(true)} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
