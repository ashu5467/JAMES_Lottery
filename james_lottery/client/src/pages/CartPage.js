import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount whenever cartItems changes
  useEffect(() => {
    const updatedTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
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

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Handle the checkout process
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
              key={item.id}
              className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div>
                <h3 className="text-xl font-bold text-blue-800">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>

               
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  onClick={() => handleRemoveFromCart(item.id)}
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
            <h2 className="text-2xl font-bold text-blue-800">Total: ${totalAmount.toFixed(2)}</h2>
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
