// UpcomingAttractions.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa'; // Importing ticket icon
import { CartContext } from '../context/CartContext';
import { fetchLotteries } from '../services/lotteryService'; // Import your fetch function
import { Carousel } from 'react-responsive-carousel'; // Import Carousel

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel CSS

const MonthlyLotteries = () => {
  const { addToCart } = useContext(CartContext);
  const [lotteries, setLotteries] = useState([]); // State to hold fetched lottery data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [selectedLotteries, setSelectedLotteries] = useState([]);
  const [showSelectionPage, setShowSelectionPage] = useState(false);

  // Fetch lottery data on component mount
  useEffect(() => {
    const fetchLotteryData = async () => {
      try {
        const data = await fetchLotteries(); // Fetch data from the service
        setLotteries(data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching lotteries:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchLotteryData(); // Call the fetch function
  }, []);


  const handleSelectLottery = (lottery) => {
    setSelectedLotteries((prev) => [...prev, lottery]); // Add to selected lotteries
    setShowSelectionPage(true); // Show selection page
  };
  const handleAddToCart = (lottery) => {
    addToCart(lottery);
  };

  if (loading) {
    return <div className="text-center text-white">Loading lotteries...</div>; // Loading message
  }

  return (
    <section className="mb-16">
      <h2 className="text-5xl font-extrabold text-yellow-300 mb-8 text-center" style={{ fontFamily: 'Cinzel, serif' }}>
        Monthly Lotteries
      </h2>
      <div className="relative flex justify-center">
        <Carousel
          showArrows={false}
          showStatus={false} 
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={2000}
          transitionTime={500}
          stopOnHover={true}
          className="carousel"
          centerMode={true}
          centerSlidePercentage={33.33} // Adjust to display 3 cards
        >
          {lotteries.map((lottery) => (
            <div key={lottery._id} className="card bg-yellow-50 border-2 border-yellow-500 p-4 shadow-lg ticket">
              <h3 className="text-2xl font-bold text-center mb-2 text-blue-800" style={{ fontFamily: 'Cinzel, serif' }}>
                {lottery.name}
              </h3>
              <p className="text-lg text-center mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                Win First Prize!
              </p>
              <p className="text-3xl font-bold text-green-600 text-center mb-4">{`$${lottery.prize}`}</p>
              <button
                onClick={() => handleSelectLottery(lottery)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-full px-4 py-2 rounded-lg transform transition-transform duration-200 hover:scale-105"
              >
                Add to Cart
              </button>
              <div className="border-t-2 border-dashed my-4 border-gray-300"></div>
              <Link
                to="/cart"
                className="bg-gradient-to-r from-green-400 to-green-600 text-white w-full px-4 py-2 rounded-lg inline-block transform transition-transform duration-200 hover:scale-105"
              >
                <FaTicketAlt className="inline mr-2" /> Buy Now
              </Link>
              <p className="text-xs text-center text-gray-600 mt-2" style={{ fontFamily: 'Cinzel, serif' }}>
                Draw Date: {lottery.startDate} <br />
                Time: {lottery.time} <br />
                Price: <span className="font-bold text-green-600">${lottery.price}</span>
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          to="/lotteries"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg inline-block text-lg font-bold hover:opacity-90 transition"
        >
          View All
        </Link>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .carousel {
          width: 100%; /* Ensure the carousel takes full width */
          overflow: hidden; /* Hide overflow so cards don't get clipped */
          padding: 0 20px; /* Add padding to the carousel */
          min-height: 400px; /* Set a minimum height for the carousel */
        }
        .carousel .slide {
          display: flex;
          justify-content: center; /* Center cards in each slide */
          align-items: center; /* Center vertically */
        }
        .card {
          width: 300px; /* Fixed width for cards */
          margin: 0 8px; /* Decrease margin to allow space for scaling */
          transition: transform 0.3s; /* Remove hover effect */
          overflow: hidden; /* Prevent clipping of content on hover */
          position: relative; /* Position relative for pseudo-elements */
        }

        /* Custom Ticket Style */
        .ticket {
          border-radius: 30px 30px 0 0; /* Rounded top corners only */
        }

        .ticket::before,
        .ticket::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 20px; /* Height of the cut effect */
          background: inherit; /* Inherit the background of the card */
          z-index: -1; /* Send behind the card */
        }

        .ticket::before {
          top: 0; /* Position at the top */
          left: 0;
          clip-path: polygon(0 100%, 10% 80%, 20% 100%, 80% 100%, 90% 80%, 100% 100%); /* Cut effect */
        }

        .ticket::after {
          bottom: 0; /* Position at the bottom */
          left: 0;
          clip-path: polygon(0 0, 10% 20%, 20% 0, 80% 0, 90% 20%, 100% 0); /* Cut effect */
        }
      `}</style>
    </section>
  );
};

export default MonthlyLotteries;
