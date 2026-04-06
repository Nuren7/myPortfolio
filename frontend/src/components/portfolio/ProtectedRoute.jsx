import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

 useEffect(() => {
  const verify = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      if (!token) {
        console.log("NO TOKEN");
        setIsValid(false);
        return;
      }

      const res = await fetch("http://localhost:3000/api/admin-check", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      console.log("ADMIN CHECK RESPONSE:", data);

      setIsValid(data.success);
    } catch (err) {
      console.error("ERROR:", err);
      setIsValid(false);
    }
  };

  verify();
}, []);

  if (isValid === null) return <div>Loading...</div>;

  if (!isValid) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;