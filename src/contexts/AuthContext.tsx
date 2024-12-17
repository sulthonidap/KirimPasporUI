import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available roles and their permissions
export type UserRole = 'admin' | 'editor' | 'user';

interface RolePermissions {
  dashboard: boolean;
  analytics: boolean;
  users: boolean;
  settings: boolean;
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  admin: {
    dashboard: true,
    analytics: true,
    users: true,
    settings: true,
  },
  editor: {
    dashboard: true,
    analytics: true,
    users: false,
    settings: false,
  },
  user: {
    dashboard: true,
    analytics: false,
    users: false,
    settings: false,
  },
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: keyof RolePermissions) => boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password',
    name: 'John Admin',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    email: 'editor@example.com',
    password: 'password',
    name: 'Jane Editor',
    role: 'editor' as UserRole,
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'password',
    name: 'Bob User',
    role: 'user' as UserRole,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Find user in mock database
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!user) return false;
    return rolePermissions[user.role][permission];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}