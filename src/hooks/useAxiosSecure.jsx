import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor: Add Firebase ID token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken(); // ← Correct way to get Firebase token
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error("Error getting Firebase ID token:", error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle 401/403
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          console.warn("Unauthorized/Forbidden - Logging out");
          try {
            await logOut();
            navigate("/auth/login", { replace: true });
          } catch (logoutError) {
            console.error("Logout failed:", logoutError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;