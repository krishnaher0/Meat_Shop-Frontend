import React, { useContext, useState } from 'react';
import { CartContext } from '../../config/CartContext'; // Adjust the import path as needed
import PaymentModal from '../../Pages/PaymentModal'; // Adjust the import path as needed
import Header from '../../Pages/Header';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);
  const [selectedItemsId, setSelectedItemsId] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateCartItem(id, newQuantity);
      }
    }
  };

  const openPaymentModal = (id) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to proceed with payment.");
      return;
    }

    const item = cartItems.find(item => item.id === id);
    setQuantity(item.quantity);
    setSubtotal(item.price * item.quantity);

    setSelectedItemsId(id);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedItemsId(null);
  };

  // setSubtotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));

  return (
    <>
    <Header/>
    <div className="top-[5rem] relative mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Cart</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between mb-4 p-4 border-b">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mb-4 md:mb-0" />
              <div className="flex-1 ml-0 md:ml-4 text-center md:text-left">
                <h2 className="font-bold">{item.name}</h2>
              </div>
              <p className="w-20 text-center">${item.price}</p>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-2"
                  disabled={item.quantity <= 1}
                >
                  &ndash;
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2">+</button>
              </div>
              <p className="w-20 text-center">${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="px-2 text-red-600">&times;</button>
            </div>
          ))}
        </div>
        <div className="md:w-1/4 mt-4 md:mt-0 md:ml-6 p-6 border rounded-lg">
          <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold mb-4">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
          <button
            className="w-full py-2 bg-green-600 text-white font-bold rounded-lg"
            onClick={() => openPaymentModal(cartItems.length > 0 ? cartItems[0].id : null)}
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
      <PaymentModal 
      isOpen={isPaymentModalOpen} 
        onRequestClose={closePaymentModal} 
        id={selectedItemsId}
        quantity={quantity}
        total={subtotal} />
    </div>
    </>
  );
};

export default Cart;
