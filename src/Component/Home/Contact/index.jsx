import React, { useState } from 'react';
import axios from 'axios';
import call from "../../../assets/images/call.png";
import location from "../../../assets/images/location.png";
import mail from "../../../assets/images/mail.png";
import Header from '../../Pages/Header';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      alert('Please log in to send a message');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/contact',
        {
          name,
          email,
          message,
          customerId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setResponseMessage('Message sent successfully');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('Failed to send message. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };


  return (
    <>
      <Header />
      <section className="bg-blue flex flex-col relative top-[5rem] z-[-1]">
        <div className="w-[85%] mx-auto flex flex-col gap-3 md:gap-14 py-6">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-medium">Get In Touch</h1>
            <p className="text-center text-sm font-light md:w-[80%] mmd:max-w-[678px]">
              We’d love to hear from you! If you have any questions, need assistance, or just want to provide feedback, don’t hesitate to get in touch with us. Here’s how you can reach us:
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-5 bg-white rounded-lg md:flex-row p-2 xl:w-[80%] xl:mx-auto lg:w-[85%] lg:mx-auto shadow-xl">
            <div className="flex flex-col bg-dark-blue rounded-lg px-2 py-6 shadow-xl text-white gap-3 md:gap-6 md:px-7 md:py-12 md:w-[75%] lg:max-w-[394px] llg:max-w-[420px] xl:max-w-[500px]">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium text-center md:text-start">Contact Information</h2>
                <p className="text-center md:text-start">Whether you prefer to call, email, or visit us in person, we are here to help.</p>
              </div>
              <div className="w-[100%]">
                <div className="flex flex-col gap-4 items-center md:items-start">
                  <div className="flex gap-2">
                    <div className="w-[25px]">
                      <img className="w-[100%] object-cover object-center" src={call} />
                    </div>
                    <h3>+9779875621852</h3>
                  </div>
                  <div className="flex gap-2 pl-5 md:pl-0 md:gap-3">
                    <div className="w-[25px]">
                      <img className="w-[100%] object-cover object-center" src={mail} />
                    </div>
                    <h3>Support@gmail.com</h3>
                  </div>
                  <div className="flex gap-2 md:pr-2">
                    <div className="w-[30px]">
                      <img className="w-[100%] object-cover object-center" src={location} />
                    </div>
                    <h3>Kathmandu, Nepal</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[80%] mx-auto md:w-[100%] lg:max-w-[545px] llg:max-w-[600px] xl:max-w-[650px]">
              <form className="flex flex-col py-3 gap-3 w-[100%] md:px-12 md:py-14 md:gap-6 xl:px-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 w-[90%] xl:w-[85%]">
                  <label className="text-gray">Your Name</label>
                  <input className="outline-none border-b-[1px] w-[100%]" type="text"id="name"
                name="name" value={name} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1 w-[90%] xl:w-[85%]">
                  <label className="text-gray">Your Email</label>
                  <input className="outline-none border-b-[1px] w-[100%]" type="email" id="email"
                name="email" value={email} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1 w-[90%] xl:w-[85%]">
                  <label className="text-gray">Message</label>
                  <textarea className="outline-none border-b-[1px]" value={message} id="message"
                name="message"onChange={handleInputChange} />
                </div>
                <div className="flex justify-start">
                  <button className="px-3 py-2 bg-dark-blue rounded-lg text-white" type="submit">Send Message</button>
                </div>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
