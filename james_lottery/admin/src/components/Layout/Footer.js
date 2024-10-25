import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Lottery Admin App. All rights reserved.</p>
        <p className="text-sm">
          Developed by <a href="https://albos.tech" className="text-white hover:underline">Albos Technologies</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
