"use client";

import { queryClient } from "@/lib/query-client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface User {
  email: string;
  name: string;
  service_type: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/users/current", { method: "GET" });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const json = await res.json();
      setUser(json.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function logout() {
    setIsLoading(true);

    try {
      const res = await fetch("/api/users/current", { method: "DELETE" });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return false;
      }

      queryClient.clear();

      setUser(null);
      toast.success(data.message);
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Server error.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside <AuthProvider>");
  }
  return ctx;
}
