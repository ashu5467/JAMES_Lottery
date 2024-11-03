import React, { useState, useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa'; // Importing ticket icon
import { CartContext } from '../context/CartContext';
import { fetchLotteries } from '../services/lotteryService';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const UpcomingAttractions = () => {
  const { addToCart } = useContext(CartContext);
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchLotteryData = async () => {
      try {
        const data = await fetchLotteries();
        setLotteries(data);
      } catch (error) {
        console.error('Error fetching lotteries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLotteryData();
  }, []);

  const handleAddToCart = (lottery, redirectToCart = false) => {
    addToCart(lottery);
    if (redirectToCart) {
      navigate('/cart'); // Navigate to cart page after adding to cart
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading lotteries...</div>;
  }

  return (
    <section className="mb-16">
      <h2 className="text-5xl font-extrabold text-yellow-300 mb-8 text-center" style={{ fontFamily: 'Cinzel, serif' }}>
        Upcoming Attractions
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
          centerSlidePercentage={33.33}
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
                onClick={() => handleAddToCart(lottery)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-full px-4 py-2 rounded-lg transform transition-transform duration-200 hover:scale-105"
              >
                Add to Cart
              </button>
              <div className="border-t-2 border-dashed my-4 border-gray-300"></div>
              <button
                onClick={() => handleAddToCart(lottery, true)} // Redirect to cart after adding
                className="bg-gradient-to-r from-green-400 to-green-600 text-white w-full px-4 py-2 rounded-lg inline-block transform transition-transform duration-200 hover:scale-105"
              >
                <FaTicketAlt className="inline mr-2" /> Buy Now
              </button>
              <p className="text-xs text-center text-gray-600 mt-2" style={{ fontFamily: 'Cinzel, serif' }}>
                Draw Date: {lottery.startDate} <br />
                Time: {lottery.time} <br />
                Price: <span className="font-bold text-green-600">${lottery.price}</span>
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/lotteries"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg inline-block text-lg font-bold hover:opacity-90 transition"
        >
          View All
        </Link>
      </div>

      <style jsx>{`
        .carousel {
          width: 100%;
          overflow: hidden;
          padding: 0 20px;
          min-height: 400px;
        }
        .carousel .slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card {
          width: 300px;
          margin: 0 8px;
          transition: transform 0.3s;
          overflow: hidden;
          position: relative;
        }
        .ticket {
          border-radius: 30px 30px 0 0;
        }
        .ticket::before,
        .ticket::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 20px;
          background: inherit;
          z-index: -1;
        }
        .ticket::before {
          top: 0;
          left: 0;
          clip-path: polygon(0 100%, 10% 80%, 20% 100%, 80% 100%, 90% 80%, 100% 100%);
        }
        .ticket::after {
          bottom: 0;
          left: 0;
          clip-path: polygon(0 0, 10% 20%, 20% 0, 80% 0, 90% 20%, 100% 0);
        }
      `}</style>
    </section>
  );
};

export default UpcomingAttractions;
