import { useEffect, useState } from "react";

const Auth = ({ onLogin }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/.auth/me") // Fetch user details
      .then((res) => res.json())
      .then((data) => {
        if (data.clientPrincipal) {
          setUser(data.clientPrincipal);
          onLogin(data.clientPrincipal); // Pass user info to parent component
        }
      });
  }, []);

  const login = () => {
    window.location.href = "/.auth/login/google";
  };

  const logout = () => {
    window.location.href = "/.auth/logout";
  };

  return (
    <div className="flex flex-col items-center p-4">
      {user ? (
        <>
          <p className="text-lg">Welcome, {user.userDetails}</p>
          <button
            onClick={logout}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={login}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
