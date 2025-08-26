import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRefreshTokenMutation } from "../api/user";

const AuthProvider = ({ children }) => {
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const refresh = async () => {
      const refreshCookie = Cookies.get("refresh");
      if (!refreshCookie) {
        Cookies.remove("access");
        return;
      }

      try {
        await refreshToken().unwrap();
      } catch (err) {
        console.log(err)
        Cookies.remove("access");
        Cookies.remove("refresh");
      }
    };

    refresh();
  }, [refreshToken]);

  return children;
};

export default AuthProvider;
