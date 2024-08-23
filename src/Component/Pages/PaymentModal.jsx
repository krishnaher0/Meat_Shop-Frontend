import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const PaymentModal = ({ isOpen, onRequestClose, id, quantity, total }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    username: '',
    email: '',
    cardNumber: '',
    expiryDate: null,
    cvvNumber: '',
  });

  const handleDateChange = (date) => {
    setPaymentDetails({ ...paymentDetails, expiryDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const paymentData = {
        username: paymentDetails.username,
        email: paymentDetails.email,
        cardNumber: paymentDetails.cardNumber,
        cvvNumber: paymentDetails.cvvNumber,
        expiryDate: paymentDetails.expiryDate,
        totalQuantity: quantity,
        totalPrice: total,
        paymentDateTime: new Date().toISOString(),
        customer: {
          customerId: localStorage.getItem("userId")
        },
        items: {
          id: id
        }
      };

      const response = await axios.post('http://localhost:8080/api/payment/process', paymentData);
      console.log('Payment processed successfully:', response.data);
      onRequestClose(); // Close modal after successful payment

    } catch (error) {
      console.error('Error processing payment:', error);
      console.log('Error data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Enter Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={paymentDetails.username}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, username: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={paymentDetails.email}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">CVC Code</label>
            <input
              type="text"
              name="cvvNumber"
              value={paymentDetails.cvvNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvvNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <DatePicker
              selected={paymentDetails.expiryDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 py-2 px-4 bg-gray-300 text-gray-700 rounded"
              onClick={onRequestClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentModal;
