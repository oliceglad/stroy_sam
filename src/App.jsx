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
import CategoriesPage from "./pages/CategoriesPage";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ProductPage from "./pages/ProductPage";
import SearchResultsPage from "./pages/SearchResultPage";
import ProfilePage from "./pages/ProfilePage";
import FailPage from "./pages/FailPage";
import MainPage from "./pages/MainPage";
import SubCategoriesPage from "./pages/SubCategoriesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Breadcrumbs />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="*" element={<Navigate to="/fail" replace />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route
              path="/categories/:categoryId"
              element={<SubCategoriesPage />}
            />
            <Route path="/fail" element={<FailPage />} />
            <Route path="/" element={<MainPage />} />
            <Route
              path="/categories/:categoryId/products"
              element={<CategoryProductsPage />}
            />
            <Route
              path="/categories/:categoryId/products/:productId"
              element={<ProductPage />}
            />
            <Route path="/products/search" element={<SearchResultsPage />} />
            <Route
              path="/products/search/:productId/"
              element={<ProductPage />}
            />

            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
