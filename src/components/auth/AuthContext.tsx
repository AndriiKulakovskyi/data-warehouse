import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would authenticate with a backend here
    // For demo purposes, we'll simulate a successful login with mock data
    const mockUser = {
      id: "123",
      username: "Dr. John Smith",
      email: email,
      isAdmin: email.includes("admin"),
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    // Store user in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(mockUser));

    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (userData: any) => {
    // In a real app, you would register with a backend here
    // For demo purposes, we'll simulate a successful registration
    const newUser = {
      id: "456",
      username: userData.fullName,
      email: userData.email,
      isAdmin: false,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
    };

    // Store user in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(newUser));

    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
