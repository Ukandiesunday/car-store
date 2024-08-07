import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "remixicon/fonts/remixicon.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { calculate } from "./components/redux1/cartSlice";
import { removeItem, storeItem } from "./components/utility/storage";
import ForgotPassword from "./components/forgotpassword/Forgotpassword";
import Reviews from "./components/Reviews/Reviews";
import Checkout from "./pages/checkout/Checkout";

const SharedLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Reviews />
      <Footer />
    </div>
  );
};

function App() {
  const { products } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculate());
  }, [products, dispatch]);

  useEffect(() => {
    storeItem("user", currentUser);
  }, [currentUser]);

  useEffect(() => {
    storeItem("products", products);

    if (products.length === 0) {
      removeItem("products");
    }
  }, [products]);

  const RequiredRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/products/"
              element={
                <RequiredRoute>
                  <Products />
                </RequiredRoute>
              }
            />
            <Route
              path="products/:id"
              element={
                <RequiredRoute>
                  <Product />
                </RequiredRoute>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={
                <RequiredRoute>
                  <Cart />
                </RequiredRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/checkout"
              element={
                <RequiredRoute>
                  <Checkout />
                </RequiredRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
