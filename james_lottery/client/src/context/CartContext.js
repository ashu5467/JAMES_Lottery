// import { createContext, useState ,useContext} from "react";

// // Create the CartContext
// export const CartContext = createContext();

// // CartProvider component that will wrap the app and provide cart state to all children
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
  
  


//   // Function to add an item to the cart
//   const addToCart = (newLottery) => {
//     setCartItems((prevItems) => {
//       // Check if the lottery with the same id already exists in the cart
//       const existingItem = prevItems.find(item => item.id === newLottery.id);
  
//       if (existingItem) {
//         // If it exists, increase the quantity
//         return prevItems.map(item =>
//           item.id === newLottery.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // If it doesn't exist, add it as a new item
//         return [...prevItems, { ...newLottery, quantity: 1 }];
//       }
//     });
//   };
  
  
//   // Function to remove an item from the cart
//   const removeFromCart = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((cartItem) => cartItem.id !== id)
//     );
//   };

//   const updateCartQuantity = (id, newQuantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   // Function to clear all items from the cart (optional)
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, clearCart ,updateCartQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext();

// CartProvider component that will wrap the app and provide cart state to all children
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (newLottery) => {
    setCartItems((prevItems) => {
      // Check if the lottery with the same id already exists in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newLottery.id);
  
      if (existingItemIndex >= 0) {
        // If it exists, increase the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1; // Increment quantity by 1
        return updatedItems; // Return updated array
      } else {
        // If it doesn't exist, add it as a new item with initial quantity of 1
        return [...prevItems, { ...newLottery, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== id)
    );
  };

  // Function to update the quantity of an item
  const updateCartQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to clear all items from the cart (optional)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
