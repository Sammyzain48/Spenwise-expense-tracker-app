import api from "./api";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function useAxiosPrivate() {
  const { auth, setAuth } = useAuth();

  api.interceptors.request.use((config) => {
    if (!config.headers["Authorization"]) {
      // check if the request doesn't have a bearer token
      config.headers["Authorization"] = `Bearer ${auth.accessToken}`; // if so then add one
    }

    return config; // send request
  });

  api.interceptors.response.use(
    (response) => {
      return response; // return successful response
    },
    async (error) => {
      const prevRequest = error.config; // grabbing the failed request

      if (error.response?.status === 401 && !prevRequest.sent) {
        // checking if error is authorized and we haven't tried this request before
        prevRequest.sent = true; // we are trying it now

        try {
          const response = await axios.get(
            "https://localhost:5000/api/auth/refresh",
            {
              withCredentials: true, //grab the cookie along with the request
            },
          );

          const { accessToken, user } = response.data; //grabs accesstoken and user from the request

          setAuth({ accessToken, user }); // adds accesstoken and user

          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`; // attach new token to the failed request

          return api(prevRequest); // resend the request
        } catch (errorMessage) {
          return Promise.reject(errorMessage); // catch any error that may occur based on the while
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
}
