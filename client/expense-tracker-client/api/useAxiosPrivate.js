import api from "./api";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useAxiosPrivate() {
  const { auth, setAuth } = useAuth();

  api.interceptors.request.use((config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const prevRequest = error.config;

      if (error.response?.status === 401 && !prevRequest.sent) {
        prevRequest.sent = true;

        try {
          const response = await axios.get(`${BASE_URL}/api/auth/refresh`, {
            withCredentials: true,
          });

          const { accessToken, user } = response.data;

          setAuth({ accessToken, user });

          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return api(prevRequest);
        } catch (errorMessage) {
          return Promise.reject(errorMessage);
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
}
