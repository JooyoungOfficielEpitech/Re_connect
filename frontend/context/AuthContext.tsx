import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of the context data
interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state for initial check
  login: () => void; // Simple mock login function
  logout: () => void; // Simple mock logout function
}

// Create the context with a default value
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Create the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start as loading

  // Simulate checking stored auth status on initial load
  useEffect(() => {
    // In a real app, you would check AsyncStorage or secure storage here
    // For now, just simulate a delay and assume not logged in initially
    const timer = setTimeout(() => {
      setIsAuthenticated(false); // Assume not logged in initially
      setIsLoading(false);
    }, 500); // Simulate 0.5 second check

    return () => clearTimeout(timer);
  }, []);

  // Mock login function
  const login = () => {
    console.log('Mock login executed');
    // In a real app, set token, user info, etc.
    setIsAuthenticated(true);
    // Optionally, navigate here or let useProtectedRoute handle it
  };

  // Mock logout function
  const logout = () => {
    console.log('Mock logout executed');
    // Clear stored token, user info, etc.
    setIsAuthenticated(false);
    // Navigation to login will be handled by useProtectedRoute
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 