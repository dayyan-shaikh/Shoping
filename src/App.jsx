import React from "react";
import { Routes, Route, Link} from 'react-router-dom';
import ProductListPage from "./pages/ProductList";
import ProductDetailsPage from "./pages/ProductDetails";
import CartListPage from "./pages/CartList";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<ProductListPage />}/>
      <Route path="/productdetails/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartListPage />} />
    </Routes>
    </>
  );
};

export default App;
