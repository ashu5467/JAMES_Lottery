import { FaUserTie } from "react-icons/fa";
import { GiFemale } from "react-icons/gi"; // A different female icon
import Slider from "react-slick"; // Import the slider component
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import { useEffect } from "react";

const WinnersPage = () => {
  // Sample winners data
  const winners = [
    {
      name: "John Doe",
      lottery: "Mega Lottery",
      prize: "$1,000,000",
      gender: "male",
    },
    {
      name: "Jane Smith",
      lottery: "Super Jackpot",
      prize: "$500,000",
      gender: "female",
    },
    {
      name: "Alice Johnson",
      lottery: "Daily Lottery",
      prize: "$10,000",
      gender: "female",
    },
    {
      name: "Bob Brown",
      lottery: "Lucky Draw",
      prize: "$250,000",
      gender: "male",
    },
    {
      name: "Emma Wilson",
      lottery: "Mega Lottery",
      prize: "$750,000",
      gender: "female",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 800, // Duration of each slide
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "40px", // Space around the centered card
  };

  // Celebration animation effect
  useEffect(() => {
    const celebrationAnimation = document.querySelector('.celebration');
    if (celebrationAnimation) {
      celebrationAnimation.classList.add('animate-celebrate');
      setTimeout(() => {
        celebrationAnimation.classList.remove('animate-celebrate');
      }, 3000); // Duration of celebration animation
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-200 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-700 celebration">Winners 🎉</h1>
        <Slider {...settings}>
          {winners.map((winner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl mx-2" // Added margin here
            >
              <div className="flex justify-center mb-4">
                {winner.gender === "male" ? (
                  <FaUserTie className="text-blue-600 w-24 h-24" />
                ) : (
                  <GiFemale className="text-pink-600 w-24 h-24" />
                )}
              </div>
              <h3 className="text-xl font-bold text-blue-600 text-center">{winner.name}</h3>
              <p className="text-center text-gray-700">Won: <span className="font-semibold">{winner.lottery}</span></p>
              <p className="text-center text-lg font-bold text-green-500">Prize: <span>{winner.prize}</span></p>
            </div>
          ))}
        </Slider>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes celebrate {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-celebrate {
          animation: celebrate 1s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default WinnersPage;
