import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/contact');
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setMessage('Failed to fetch contacts');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="odd:bg-gray-100 even:bg-gray-200">
              <td className="py-3 px-4">{contact.name}</td>
              <td className="py-3 px-4">{contact.email}</td>
              <td className="py-3 px-4">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactMessages;
