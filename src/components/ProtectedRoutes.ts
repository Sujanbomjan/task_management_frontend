import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        toast.error("You are not authenticated!");
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      toast.error("You are not authenticated!");
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
