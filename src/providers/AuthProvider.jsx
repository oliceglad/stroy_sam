import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRefreshTokenMutation } from "../api/user";
import { Loader } from "../components/UI/Loader/Loader";

const AuthProvider = ({ children }) => {
  const [refreshToken] = useRefreshTokenMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      const refreshCookie = Cookies.get("refresh");
      if (!refreshCookie) {
        Cookies.remove("access");
        setLoading(false);
        return;
      }

      try {
        await refreshToken().unwrap();
      } catch (err) {
        console.log(err);
        Cookies.remove("access");
        Cookies.remove("refresh");
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, [refreshToken]);

  if (loading) {
    return <Loader />;
  }

  return children;
};

export default AuthProvider;
