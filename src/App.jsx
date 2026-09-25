import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Nav/NavBar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Catalog from "./pages/Catalog/Catalog";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

const App = () => {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/category/:categoryId" element={<Catalog />} />
          <Route path="/item/:itemId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
