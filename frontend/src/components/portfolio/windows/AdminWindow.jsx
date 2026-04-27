import { useState } from "react";

function AdminWindow({ isAuthenticated, login, logout }) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(password);

    if (!success) {
      alert("Wrong password");
    }

    setPassword("");
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
            />
              <button type="submit" className="border-2 hover:scale-110 cursor-pointer font-pixelify">
                Login
              </button>
        </form>
      ) : (
        <div className="font-pixelify">
          <p>Welcome Admin 👤</p>
          <p>Here is your token ꄗ!</p>
          <p>Click the token icon to access the admin panel</p>
          <p>Or else, click the logout button</p>
          <button onClick={logout} className="border-2 hover:scale-110 cursor-pointer font-pixelify">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminWindow;