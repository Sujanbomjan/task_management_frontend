import { useAuth } from "@/context/AuthContext";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("You are not authenticated!");
      navigate("/login");
    }
  }, [navigate, setToken]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        toast.error("You are not authenticated!");
        setToken(null);
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, setToken]);

  if (!token) return null;

  return children;
};

export default ProtectedRoute;
