import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';

// Initial state
const initialState = {
  cart: null,
  items: [],
  isLoading: false,
  error: null,
  totalQuantity: 0,
  totalPrice: 0,
};

// Action types
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CART: 'SET_CART',
  SET_ERROR: 'SET_ERROR',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  CALCULATE_TOTALS: 'CALCULATE_TOTALS',
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CART_ACTIONS.SET_CART:
      // console.log('Setting cart data:', action.payload);
      return {
        ...state,
        cart: action.payload.cart,
        items: action.payload.items || [],
        isLoading: false,
        error: null,
      };
    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case CART_ACTIONS.ADD_ITEM:
      console.log('Adding item to cart:', action.payload);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case CART_ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: null,
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
    case CART_ACTIONS.CALCULATE_TOTALS: {
      // Ensure items is an array
      const items = Array.isArray(state.items) ? state.items : [];
      
      const totalQuantity = items.reduce((total, item) => {
        return total + (item?.quantity || 0);
      }, 0);
      
      const totalPrice = items.reduce((total, item) => {
        // Add safety checks for item structure
        if (!item?.quantity || !item?.product?.unit_price) {
          console.warn('Invalid cart item structure:', item);
          return total;
        }
        return total + (item.quantity * item.product.unit_price);
      }, 0);
      
      // console.log('Cart totals calculated:', { totalQuantity, totalPrice, itemCount: items.length });
      
      return {
        ...state,
        totalQuantity,
        totalPrice,
      };
    }
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Context provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Get or create cart on component mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        let cartId = localStorage.getItem('cart_id');
        
        if (!cartId) {
          console.log('No cart ID found, creating new cart');
          const newCart = await cartAPI.createCart();
          cartId = newCart.id;
          localStorage.setItem('cart_id', cartId);
          console.log('New cart created:', newCart);
          dispatch({ type: CART_ACTIONS.SET_CART, payload: { cart: newCart, items: [] } });
          return;
        }

        // console.log('Loading existing cart:', cartId);
        try {
          const cart = await cartAPI.getCart(cartId);
          // console.log('Cart loaded successfully:', cart);
          
          // Validate cart items structure
          const validItems = (cart.items || []).filter(item => {
            if (!item.product || !item.product.unit_price) {
              console.warn('Invalid cart item found and filtered out:', item);
              return false;
            }
            return true;
          });
          
          dispatch({ type: CART_ACTIONS.SET_CART, payload: { cart, items: validItems } });
        } catch (error) {
          console.warn('Cart not found, creating new one:', error);
          // Cart might not exist, create a new one
          const newCart = await cartAPI.createCart();
          localStorage.setItem('cart_id', newCart.id);
          console.log('New cart created after error:', newCart);
          dispatch({ type: CART_ACTIONS.SET_CART, payload: { cart: newCart, items: [] } });
        }
      } catch (error) {
        console.error('Failed to initialize cart:', error);
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to initialize cart' });
      }
    };

    initializeCart();
  }, []);

  // Calculate totals when items change
  useEffect(() => {
    try {
      dispatch({ type: CART_ACTIONS.CALCULATE_TOTALS });
    } catch (error) {
      console.error('Error calculating cart totals:', error);
      // Set safe defaults if calculation fails
      dispatch({ 
        type: CART_ACTIONS.CALCULATE_TOTALS, 
        payload: { totalQuantity: 0, totalPrice: 0 } 
      });
    }
  }, [state.items]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!state.cart) {
      console.error('No cart available');
      return { success: false, error: 'Cart not initialized' };
    }

    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

    try {
      console.log('Adding to cart:', { productId, quantity, cartId: state.cart.id });
      
      // Add item to cart (this returns minimal structure)
      await cartAPI.addCartItem(state.cart.id, {
        product_id: productId,
        quantity,
      });
      
      // Fetch the complete cart to get proper item structure
      console.log('Fetching updated cart after adding item');
      const updatedCart = await cartAPI.getCart(state.cart.id);
      console.log('Updated cart fetched successfully:', updatedCart);
      
      // Validate cart items structure
      const validItems = (updatedCart.items || []).filter(item => {
        if (!item.product || !item.product.unit_price) {
          console.warn('Invalid cart item found and filtered out:', item);
          return false;
        }
        return true;
      });
      
      // Update the entire cart state with fresh data
      dispatch({ 
        type: CART_ACTIONS.SET_CART, 
        payload: { cart: updatedCart, items: validItems } 
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to add item to cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    if (!state.cart) return;

    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

    try {
      await cartAPI.updateCartItem(state.cart.id, itemId, { quantity });
      
      // Fetch the complete cart to get updated structure
      const updatedCart = await cartAPI.getCart(state.cart.id);
      
      // Validate cart items structure
      const validItems = (updatedCart.items || []).filter(item => {
        if (!item.product || !item.product.unit_price) {
          console.warn('Invalid cart item found and filtered out:', item);
          return false;
        }
        return true;
      });
      
      // Update the entire cart state with fresh data
      dispatch({ 
        type: CART_ACTIONS.SET_CART, 
        payload: { cart: updatedCart, items: validItems } 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to update cart item';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!state.cart) return;

    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

    try {
      await cartAPI.deleteCartItem(state.cart.id, itemId);
      
      // Fetch the complete cart to get updated structure
      const updatedCart = await cartAPI.getCart(state.cart.id);
      
      // Validate cart items structure
      const validItems = (updatedCart.items || []).filter(item => {
        if (!item.product || !item.product.unit_price) {
          console.warn('Invalid cart item found and filtered out:', item);
          return false;
        }
        return true;
      });
      
      // Update the entire cart state with fresh data
      dispatch({ 
        type: CART_ACTIONS.SET_CART, 
        payload: { cart: updatedCart, items: validItems } 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to remove item from cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!state.cart) return;

    try {
      await cartAPI.deleteCart(state.cart.id);
      localStorage.removeItem('cart_id');
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      
      // Create new cart
      const newCart = await cartAPI.createCart();
      localStorage.setItem('cart_id', newCart.id);
      dispatch({ type: CART_ACTIONS.SET_CART, payload: { cart: newCart, items: [] } });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to clear cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Clear cart locally without API call (used when backend already deleted the cart)
  const clearCartLocally = async () => {
    try {
      localStorage.removeItem('cart_id');
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      
      // Create new cart
      const newCart = await cartAPI.createCart();
      localStorage.setItem('cart_id', newCart.id);
      dispatch({ type: CART_ACTIONS.SET_CART, payload: { cart: newCart, items: [] } });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to create new cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    clearCartLocally,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
