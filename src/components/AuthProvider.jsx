import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { silentRefresh, setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          // First set user from localStorage
          dispatch(setUser({ 
            ...JSON.parse(user),
            token 
          }));
          
          // Then attempt silent refresh in background
          await dispatch(silentRefresh()).unwrap();
        } catch (error) {
          console.error("Silent refresh failed:", error);
          dispatch(logoutUser());
          if (window.location.pathname !== "/users/login") {
            navigate("/users/login");
          }
        }
      } else if (!token && window.location.pathname !== "/users/login") {
        navigate("/users/login");
      }
    };

    initializeAuth();
  }, [dispatch, navigate]);

  return children;
};

export default AuthProvider;