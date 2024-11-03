import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const { userId } = useAuth();
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount whenever cartItems changes
  useEffect(() => {
    const updatedTotal = cartItems.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
    setTotalAmount(updatedTotal);
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, newQuantity) => {
    updateCartQuantity(id, newQuantity); // Assuming your context provides an updateCartQuantity function
  };

  const handleCheckout = async () => {
    
    try {
      const response = await fetch('http://localhost:5000/api/checkout', { // Ensure this URL is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId,cartItems }),
      });
      const result = await response.json();
      {console.log(userId)}
  
      if (response.ok) {
        alert("Purchase successful!");
        // Clear cart and redirect to profile or reload history if in profile page
        // resetCart();  // Assuming you have a function in context to clear the cart
        // Optionally, navigate to profile page here if not already there
      } else {
        alert("Error during purchase: " + result.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  



  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        Your Cart
      </h1>
      <div className="text-center mb-6">
        <FaShoppingCart className="inline-block text-6xl text-blue-500" />
        <p className="text-lg text-gray-600">
          You have {cartItems.length} lottery{cartItems.length !== 1 ? "s" : ""} in your cart.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-lg text-center text-gray-500">Your cart is empty. Go add some lotteries!</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div>
                <h3 className="text-xl font-bold text-blue-800">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>

               
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  onClick={handleCheckout}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <h2 className="text-2xl font-bold text-blue-800">Total: ${totalAmount}</h2>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-700 transition-colors"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
