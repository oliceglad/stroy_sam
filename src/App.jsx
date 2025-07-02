import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/auth/VerificationPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CartPage from "./pages/CartPage";
import DeliveryPage from "./pages/DeliveryPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
