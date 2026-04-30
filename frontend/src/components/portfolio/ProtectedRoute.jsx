import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiFetch } from "../../config/api";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsValid(false);
          return;
        }

        const data = await apiFetch("/admin-check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsValid(data.success);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsValid(false);
      }
    };

    verify();
  }, []);

  if (isValid === null) {
    return <div className="font-pixelify">Checking auth...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;