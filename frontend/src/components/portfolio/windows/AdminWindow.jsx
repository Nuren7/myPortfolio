import { useState } from "react";

function AdminWindow({ isAuthenticated, login, logout }) {
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(password);

    if (!success) {
      alert("Wrong password");
    }

    setPassword("");
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div className="flex gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="font-pixelify">
          <p>Welcome Admin 👤</p>
          <p>Here is your token ꄗ!</p>
          <p>Click the token icon to access the admin panel</p>
          <p>Or else, click the logout button</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default AdminWindow;