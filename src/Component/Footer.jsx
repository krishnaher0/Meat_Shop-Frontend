import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-red-900 text-white py-9 mt-15">
            <div className="container mx-auto text-center">
                <div className="mb-6">
                    <p className="text-lg font-semibold text-blue-400">Meatshop all over Nepal</p>
                    <p className="text-sm text-blue-400">Online place for buying fresh meats</p>
                </div>
                <div className="mb-4">
                    <a href="#" className="text-blue-400 hover:underline mx-2">Careers</a>
                    <a href="#" className="text-blue-400 hover:underline mx-2">Privacy Policy</a>
                    <a href="#" className="text-blue-400 hover:underline mx-2">Terms & Conditions</a>
                </div>
                <div>
                    <p className="text-sm text-blue-400">&copy; {new Date().getFullYear()} TryMeat. Inc.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
