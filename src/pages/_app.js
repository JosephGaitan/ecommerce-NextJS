import "@/styles/globals.css";
import { useState, useEffect, use } from "react";

export default function App({ Component, pageProps }) {
  const cartLs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart")) ?? []
      : [];
  const [cart, setCart] = useState(cartLs);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (guitar) => {
    // Comprobar si la guitarra ya esta en el carrito...
    if (cart.some((guitarState) => guitarState.id === guitar.id)) {
      // Iterar para actualizar la cantidad
      const updatedCart = cart.map((guitarState) => {
        if (guitarState.id === guitar.id) {
          guitarState.amount = guitar.amount;
        }
        return guitarState;
      });
      // Se asigna al array
      setCart([...updatedCart]);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // En caso de que el articulo no exista, es nuevo y se agrega
      setCart([...cart, guitar]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const deleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.id != id);
    setCart(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updatedAmount = (guitar) => {
    const updatedCart = cart.map((guitarState) => {
      if (guitarState.id === guitar.id) {
        guitarState.amount = parseInt(guitar.amount);
      }
      return guitarState;
    });
    setCart(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  };
  return ready ? (
    <Component
      {...pageProps}
      setCart={setCart}
      cart={cart}
      addCart={addCart}
      deleteItem={deleteItem}
      updatedAmount={updatedAmount}
    />
  ) : null;
}
