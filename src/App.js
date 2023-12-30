import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "remixicon/fonts/remixicon.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculate } from "./Redux/cartReducer";
import Cart from "./components/Cart/Cart";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

function App() {
  const products = useSelector((store) => store.cart.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculate());
  }, [products]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;