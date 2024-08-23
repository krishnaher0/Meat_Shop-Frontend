import React, { useEffect, useState } from 'react';
import axios from 'axios';

import image1 from '../../../assets/images/akash.jpg';
import image2 from '../../../assets/images/Image.jpeg';
import image3 from '../../../assets/images/sabinPto.jpg';
import image5 from '../../../assets/images/image.webp';
import image4 from '../../../assets/images/saugat.jpg';
import Header from '../../Pages/Header';
import Footer from '../../Footer';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/about');
        if (response.data && response.data.data && response.data.data.length > 0) {
          setAboutData(response.data.data[0]);
        } else {
          setError(new Error('No about data found'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error fetching data: {error.message}</p>;
  if (!aboutData) return <p className="text-center py-8">No about data available</p>;

  const images = [image1, image2, image3, image4];

  return (
    <>
    <div className='fixed h-[4rem] w-[100%] z-[50]'>
    <Header />
    </div>
  
      <div className="h-[0px] mx-auto px-4 top-[5rem] relative py-8 ">
        <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg "
            >
              <img src={image} alt={`House ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mb-12 text-center">
          <p className="text-lg text-gray-700">{aboutData.ourVision}</p>
        </div>
        <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-6">
          <div className="mb-6 lg:mb-0 lg:w-1/2">
            <p className="text-lg text-gray-700">{aboutData.ourMission}</p>
          </div>
          <div
            className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 
             w-[400px] "
          >
            <img src={image5} alt="Mission Image" className="w-[100%] h-full object-cover" />
          </div>
        </div>
       
      </div>

     
      
     
    </>
  );
};

export default About;
