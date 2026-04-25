import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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

        const res = await fetch("http://localhost:3000/admin-check", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        const data = await res.json();

        setIsValid(data.success);
      } catch (err) {
        console.error(err);
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