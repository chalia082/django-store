import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AUTH_ACTIONS = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const user = await authAPI.getCurrentUser();
          dispatch({ type: AUTH_ACTIONS.AUTH_SUCCESS, payload: user });
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: null });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: null });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });
    
    try {
      const response = await authAPI.login(credentials);
      const { access, refresh } = response;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      const user = await authAPI.getCurrentUser();
      dispatch({ type: AUTH_ACTIONS.AUTH_SUCCESS, payload: user });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Login failed';
      dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });
    
    try {
      await authAPI.register(userData);
      
      // Automatically log in after registration
      const loginResult = await login({
        username: userData.username,
        password: userData.password,
      });
      
      return loginResult;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Registration failed';
      dispatch({ type: AUTH_ACTIONS.AUTH_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, [login]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
