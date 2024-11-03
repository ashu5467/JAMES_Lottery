// // import { createContext, useContext, useState } from 'react';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [username, setUsername] = useState(""); // Store username

// //   return (
// //     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);



// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState(""); // Store username
//   const [userId, setUserId] = useState(""); // Store user ID

//   const login = (userData) => {
//     setIsLoggedIn(true);
//     setUsername(userData.username);
//     setUserId(userData.id); // Assuming userData has an 'id' field
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUsername("");
//     setUserId(""); // Clear user ID upon logout
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  //const [userId, setUserId] = useState(""); // Store user ID
  const [token, setToken] = useState(""); // Store JWT token

  const login = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setUserId(userData.id); // Assuming userData has an 'id' field
    setToken(userData.token); // Save token for future requests
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserId("");
    setToken(""); // Clear token upon logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
