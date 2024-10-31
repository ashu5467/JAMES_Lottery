import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // Import Slick styles
import TicketWinners from '../components/TicketWinners'; // Corrected path
import { useEffect , useState} from "react";

import banner1 from '../assets/b1.jpg'; // Import your banner images
import banner2 from '../assets/b2.jpg';
import banner3 from '../assets/banner3.webp'; // Ensure this path is correct
import banner4 from '../assets/jackpot_banner.jpg';
import banner5 from '../assets/lotteryjackpot.jpg';
import banner6 from '../assets/lotteryJackpot.png';
import ResultImage from '../assets/big_win.jpg';
import GetInTouch from "../components/GetInTouch";
import FAQ from "../components/FAQ";
import UpcomingAttractions from "../components/UpcomingAttractions";
import MonthlyLotteries from "./MonthlyLotteries";
import resultImg from '../assets/showresultimg.jpg'

const HomePage = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const winners = [
    {
      name: 'John Doe',
      image: 'path_to_image.jpg', // Replace with actual image path
      prize: '$10,000',
      ticketNumber: 'Ticket #12345',
    },
    {
      name: 'Jane Smith',
      image: 'path_to_image.jpg',
      prize: '$5,000',
      ticketNumber: 'Ticket #54321',
    },
    // Add more winners as needed
  ];

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Make the text slide in after the component loads
    }, 500); // Delay before the text starts sliding in

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-200 to-pink-200 py-10"> {/* Light gradient background */}
    {/* Carousel Section */}
    <section className="mb-16">
          <Slider {...settings}>
            <div>
              <img src={banner1} alt="Banner 1" className="w-full h-50 object-cover rounded-lg" /> {/* Adjusted height */}
            </div>
            <div>
              <img src={banner2} alt="Banner 2" className="w-full h-50 object-cover rounded-lg" /> {/* Adjusted height */}
            </div>
          </Slider>
        </section>
      <div className="container mx-auto px-4">
        

        <UpcomingAttractions/>

        {/* Sliding Images Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-extrabold text-yellow-300 mb-8 text-center"></h2>
          <Slider {...slideSettings}>
            <div>
              <img src={banner4} alt="Slide 1" className="w-full h-40 object-cover rounded-lg" />
            </div>
            <div>
              <img src={banner5} alt="Slide 2" className="w-full h-40 object-cover rounded-lg" />
            </div>
            <div>
              <img src={banner6} alt="Slide 3" className="w-full h-40 object-cover rounded-lg" />
            </div>
          </Slider>
        </section>
        <MonthlyLotteries/>

      
        {/* How to Play and Latest Results Sections */}
<section className="mb-16 flex flex-wrap justify-center">
  {/* How to Play Section */}
  <div className="w-full md:w-1/2 px-4 mb-8 flex flex-col"> {/* Added flex and flex-col */}
    <h2 className="text-5xl font-extrabold text-blue-800 mb-8 text-center uppercase tracking-wide animate-fadeIn">
      How to Play
    </h2>
    <div
      className="flex-grow p-10 rounded-xl shadow-lg animate-fadeIn text-gray-900 border border-opacity-10 border-gray-300" // Added flex-grow
      style={{
        background: 'linear-gradient(135deg, #f9e8e2 0%, #d6f0f8 50%, #e6eaf9 100%)', // Light pink to soft blue and lavender gradient
      }}
    >
      <ol className="list-decimal list-inside space-y-6 text-2xl font-bold tracking-wider">
        <li className="hover:text-pink-600 transition duration-300 ease-in-out">Select a lottery.</li>
        <li className="hover:text-pink-600 transition duration-300 ease-in-out">Pick your numbers or use the auto-pick option.</li>
        <li className="hover:text-pink-600 transition duration-300 ease-in-out">Add to cart and purchase tickets.</li>
        <li className="hover:text-pink-600 transition duration-300 ease-in-out">Wait for the draw and check the results!</li>
      </ol>
    </div>

    <style jsx>{`
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>

  {/* Latest Results Section */}
  <div className="w-full md:w-1/2 px-4 mb-8 flex flex-col"> {/* Added flex and flex-col */}
    <section className="flex flex-col h-full"> {/* Added flex-col and h-full to make it take full height */}
      <h2 className="text-5xl font-extrabold text-blue-800 mb-8 text-center uppercase tracking-wide animate-fadeIn">
        Latest Result 
      </h2>
      
      <div
        className="flex-grow p-10 rounded-xl shadow-lg animate-fadeIn text-gray-900 border border-opacity-10 border-gray-300" // Added flex-grow
        style={{
          background: 'linear-gradient(135deg, #f9e8e2 0%, #d6f0f8 50%, #e6eaf9 100%)', // Light pink to soft blue and lavender gradient
        }}
      >
        <img
          src={resultImg}
          alt="Lottery Results"
          className="mb-6 w-full h-auto rounded-md" 
        />
        <div className="flex justify-center"> {/* Added flex and justify-center to center the button */}
          <Link
            to="/results"
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-bold hover:opacity-90 transition drop-shadow-lg" 
          >
            View Results
          </Link>
        </div>
      </div>
      
    </section>
    
  </div>
</section>


        <section>
          {/* Ticket Winners Section */}
          <TicketWinners winners={winners} />
        </section>
        <section>
          <GetInTouch/>
        </section>
        <section>
          <FAQ/>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
