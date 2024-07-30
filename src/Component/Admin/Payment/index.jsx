import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatDate = (date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  let month = (1 + formattedDate.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  return `${month}/${year}`;
};

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/payment/getAll');
        setPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching payments: {error}</p>;
  }

  return (
    <div className="payment-table-container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
             
              <th className="border border-gray-300 px-4 py-2">Payment Date</th>
              <th className="border border-gray-300 px-4 py-2">Customer ID</th>
              <th className="border border-gray-300 px-4 py-2">Items Name</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-2">{payment.username}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.email}</td>
               
                <td className="border border-gray-300 px-4 py-2">{formatDate(payment.paymentDateTime)}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.customer.customerId}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.items.itemName}</td>
                <td className="border border-gray-300 px-4 py-2">${payment.totalPrice}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
