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
import { AuthProvider } from './context/AuthContext'; // Import the Auth provider
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute
import ProfilePage from "./components/ProfilePage";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lotteries" element={<LotteriesPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/winners" element={<WinnersPage />} />
                <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} /> {/* Protected Route */}
                <Route path="/lottery-selection" element={<PrivateRoute><LotterySelectionPage/></PrivateRoute>} /> {/* Protected Route */}
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} /> 
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
