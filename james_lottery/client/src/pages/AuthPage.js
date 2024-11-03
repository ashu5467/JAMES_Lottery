import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthPage = () => {
  const { isLoggedIn, username, login, logout } = useAuth(); // Correctly access context values
  const navigate = useNavigate(); // Initialize navigate
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "", // Only needed for registration
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${isLogin ? "login" : "register"}`, formData);
      console.log(`${isLogin ? "Login" : "Registration"} successful`, response.data);
      if (isLogin) {
        // Login with response
        login({ id: response.data.userId, username: formData.username, token: response.data.token });
        navigate("/", { state: { username: formData.username } });
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  // If the user is logged in, show their username instead of the form
  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-500">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Welcome, {username}!</h2>
          <button
            onClick={() => {
              logout(); // Call the logout function from context
              navigate("/auth"); // Optionally redirect to auth page after logout
            }}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full outline-none"
                required
                placeholder="Enter your username"
              />
            </div>
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
                required
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
