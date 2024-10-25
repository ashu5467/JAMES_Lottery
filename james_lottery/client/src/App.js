import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LotteriesPage from "./pages/LotteriesPage";
import ResultsPage from "./pages/ResultsPage";
import WinnersPage from "./pages/WinnersPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import { CartProvider } from './context/CartContext'; 
import UpcomingAttractions from "./components/UpcomingAttractions";
import LotterySelectionPage from "./pages/LotterySelectionPage";

function App() {
  return (
    <CartProvider>
      <Router> {/* Move Router here */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lotteries" element={<LotteriesPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/winners" element={<WinnersPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/lottery-selection" element={<LotterySelectionPage/>} />
            </Routes>
          </main>
          <Footer />
        </div>
        {/* Any components that need access to Router context should go inside the Router */}
        
      </Router>
    </CartProvider>
  );
}

export default App;
