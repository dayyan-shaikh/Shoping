// context/index.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  const fetchListOfProducts = async () => {
    try {
      const apiRes = await fetch("https://dummyjson.com/products");
      const res = await apiRes.json();
      console.log(res);
      setListOfProducts(res.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function handleAddCart(getProductDetails) {
    let cpyExistingCartItem = [...cartItem];
    const findCurrentItemIndex = cpyExistingCartItem.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );
    if (findCurrentItemIndex === -1) {
      cpyExistingCartItem.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails.price,
      });
    } else {
      cpyExistingCartItem[findCurrentItemIndex] = {
        ...cpyExistingCartItem[findCurrentItemIndex],
        quantity: cpyExistingCartItem[findCurrentItemIndex].quantity + 1,
        totalPrice:
          (cpyExistingCartItem[findCurrentItemIndex].quantity + 1) *
          cpyExistingCartItem[findCurrentItemIndex].price,
      }
    }
    // console.log(cpyExistingCartItem,"cpyExistingCartItem");
    setCartItem(cpyExistingCartItem);
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItem));
    navigate("/cart");
  }

  function handleRemoveCart(getProductDetails, FullRemoveItem) {
    let cpyExistingCartItem = [...cartItem];
    const findCurrentItemIndex = cpyExistingCartItem.findIndex(
      (item) => item.id === getProductDetails.id
    );
    if (FullRemoveItem) {
      cpyExistingCartItem.splice(findCurrentItemIndex, 1);
    } else {
      cpyExistingCartItem[findCurrentItemIndex] = {
        ...cpyExistingCartItem[findCurrentItemIndex],
        quantity: cpyExistingCartItem[findCurrentItemIndex].quantity - 1,
        totalPrice:
          (cpyExistingCartItem[findCurrentItemIndex].quantity - 1) *
          cpyExistingCartItem[findCurrentItemIndex].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItem));
    setCartItem(cpyExistingCartItem);
  }

  useEffect(() => {
    fetchListOfProducts();
    setCartItem(JSON.parse(localStorage.getItem("cartItems") || []));
  }, []);
  console.log(cartItem);

  return (
    <ShoppingCartContext.Provider
      value={{
        loading,
        listOfProducts,
        setLoading,
        productDetails,
        cartItem,
        handleAddCart,
        setProductDetails,
        handleRemoveCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
