import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({}); // creating a state for authentication
  const [loading, setLoading] = useState(true); // creating a state for loading

  function logout() {
    setAuth({});
    window.location.href = "/login";
    return;
  }

  useEffect(() => {
    let autoLogout;

    async function refreshAccessToken() {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/refresh", {
          withCredentials: true,
        });

        const { accessToken, user } = res.data;

        setAuth({ accessToken, user });
        console.log("accesstokens was refreshed");

        const decodeToken = jwtDecode(accessToken);

        const expiryTime = decodeToken.exp * 1000;

        const timeLeft = expiryTime - Date.now();

        if (timeLeft <= 0) {
          logout();
          return;
        }

        autoLogout = setTimeout(() => {
          logout();
        }, timeLeft);
      } catch (error) {
        console.log("failed to refresh accesstoken -> ", error.message);
      } finally {
        setLoading(false);
      }
    }

    refreshAccessToken();

    return () => {
      clearTimeout(autoLogout);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
