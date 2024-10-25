import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // Import Slick styles
//import TicketWinners from '..components/TicketWinners.js'
import TicketWinners from '../components/TicketWinners'; // Corrected path
import { useEffect , useState} from "react";


import banner1 from '../assets/banner1.webp'; // Import your banner images
import banner2 from '../assets/banner2.webp';
import banner3 from '../assets/banner3.webp'; // Ensure this path is correct
import banner4 from '../assets/jackpot_banner.jpg';
import banner5 from '../assets/lotteryjackpot.jpg';
import banner6 from '../assets/lotteryJackpot.png';
import ResultImage from '../assets/big_win.jpg'
import GetInTouch from "../components/GetInTouch";
import FAQ from "../components/FAQ";
import UpcomingAttractions from "../components/UpcomingAttractions";
import MonthlyLotteries from "./MonthlyLotteries";

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
    <div className="bg-gradient-to-b from-purple-500 to-pink-500 py-10">
      <div className="container mx-auto px-4">
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

        <section className="mb-16 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-20 rounded-lg shadow-2xl animate-fadeIn relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-30 blur-2xl animate-pulse"></div>

      <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-widest animate-bounce">
        Welcome to the James Lottery System
      </h1>
      
      <p
        className={`text-xl font-semibold text-white transition-all duration-1000 ease-in-out transform ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
        }`}
      >
        Participate in the best lotteries and win big!
      </p>

      <p
        className={`mt-4 text-lg text-white transition-opacity duration-1000 ease-in-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        Try your luck and become the next jackpot winner!
      </p>
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out;
        }
      `}</style>
    </section>


       
        <UpcomingAttractions/>

         {/* Sliding Images Section */}
         <section className="mb-16">
          <h2 className="text-4xl font-extrabold text-yellow-300 mb-8 text-center">
        
          </h2>
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
          
{/* How to Play Section */}
<section className="mb-16">
  <h2 className="text-5xl font-extrabold text-blue-800 mb-8 text-center uppercase tracking-wide animate-fadeIn">
    How to Play
  </h2>
  <div
    className="p-10 rounded-xl shadow-lg animate-fadeIn text-gray-900 border border-opacity-10 border-gray-300"
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
</section>



         {/* Latest Results Section */}
 {/* Latest Results Section */}
<section
  className="mb-16 text-center bg-cover bg-center bg-no-repeat py-16"
  style={{ backgroundImage: `url(${ResultImage})` }}
>
  <h2 className="text-4xl font-extrabold text-yellow-300 mb-8 drop-shadow-lg">
    Latest Results
  </h2>
  <p className="text-xl text-white mb-8 drop-shadow-lg opacity-90">
    Check out the latest lottery results and see if you're a winner!
  </p>
  <Link
    to="/results"
    className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-bold hover:opacity-90 transition drop-shadow-lg"
  >
    View Results
  </Link>
</section>
<section>
{/* Ticket Winners Section */}
<TicketWinners winners={winners} />
</section>
<section>
<GetInTouch/></section>

<section><FAQ/></section>



      </div>
    </div>
  );
};

export default HomePage;
