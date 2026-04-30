import { useState } from "react";

function AdminWindow({ isAuthenticated, login, logout }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) return;

    setLoading(true);

    try {
      const success = await login(password);

      if (!success) {
        alert("Wrong password");
      } else {
        setPassword("");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-pixelify"
            placeholder="Enter password"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="border-2 hover:scale-110 cursor-pointer font-pixelify"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      ) : (
        <div className="font-pixelify">
          <p>Welcome Admin 👤</p>
          <p>Token is stored securely in localStorage.</p>
          <p>You can now access admin features.</p>

          <button
            onClick={logout}
            className="border-2 hover:scale-110 cursor-pointer font-pixelify"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminWindow;