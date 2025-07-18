// - Manages cart, favourites, selected size/color.
// - Uses useReducer for predictable state updates.
// - Exposes actions for all major interactions.
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  favourites: [],
  cart: [],
  selections: {}
};

function isSameCartItem(a, b) {
  if (a.productId !== b.productId) return false;
  const aKeys = Object.keys(a).filter(
    (k) => k !== 'productId' && k !== 'quantity'
  );
  const bKeys = Object.keys(b).filter(
    (k) => k !== 'productId' && k !== 'quantity'
  );
  if (aKeys.length !== bKeys.length) return false;
  for (let key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

function shopReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAV':
      return {
        ...state,
        favourites: state.favourites.includes(action.id)
          ? state.favourites.filter((f) => f !== action.id)
          : [...state.favourites, action.id]
      };
    case 'ADD_CART': {
      const item = action.payload;
      let found = false;
      const newCart = state.cart.map((ci) => {
        if (isSameCartItem(ci, item)) {
          found = true;
          return { ...ci, quantity: ci.quantity + 1 };
        }
        return ci;
      });
      if (!found) {
        newCart.push({ ...item, quantity: 1 });
      }
      return { ...state, cart: newCart };
    }
    case 'REMOVE_CART': {
      const item = action.payload;
      let removed = false;
      const newCart = state.cart
        .map((ci) => {
          if (!removed && isSameCartItem(ci, item)) {
            removed = true;
            if (ci.quantity > 1) return { ...ci, quantity: ci.quantity - 1 };
            return null;
          }
          return ci;
        })
        .filter(Boolean);
      return { ...state, cart: newCart };
    }
    case 'SET_SELECTION':
      return {
        ...state,
        selections: {
          ...state.selections,
          [action.id]: {
            ...state.selections[action.id],
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
}

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const toggleFavourite = (id) => dispatch({ type: 'TOGGLE_FAV', id });

  const addToCart = (productId, options = {}) =>
    dispatch({ type: 'ADD_CART', payload: { productId, ...options } });

  const removeFromCart = (productId, options = {}) =>
    dispatch({ type: 'REMOVE_CART', payload: { productId, ...options } });

  const setSelection = (id, payload) =>
    dispatch({ type: 'SET_SELECTION', id, payload });

  return (
    <ShopContext.Provider
      value={{
        ...state,
        toggleFavourite,
        addToCart,
        removeFromCart,
        setSelection
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
