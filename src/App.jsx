import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Header from "./components/Header/Header";
import TopHeader from "./components/TopHeader/TopHeader";
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
import AuthProvider from "./providers/AuthProvider";
import FavoritesPage from "./pages/FavoritesPage";
import ContactsPage from "./pages/ContactsPage";
import DataPolicyPage from "./pages/documents/DataPolicyPage";
import SalesRulesPage from "./pages/documents/SalesRulesPage";
import RecTechRulesPage from "./pages/documents/RecTechRulesPage";
import PublicOfferPage from "./pages/documents/PublicOfferPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <TopHeader />
          <Header />
          <Breadcrumbs />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
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
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              
              <Route path="/data-policy" element={<DataPolicyPage />} />
              <Route path="/sales-rules" element={<SalesRulesPage />} />
              <Route path="/rec-tech-rules" element={<RecTechRulesPage />} />
              <Route path="/public-offer" element={<PublicOfferPage />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
