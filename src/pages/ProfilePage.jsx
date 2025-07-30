// pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetMeQuery, useLogoutUserMutation } from "../api/user";
import { useGetUserOrdersQuery } from "../api/orders";
import { Loader } from "../components/UI/Loader/Loader";
import ProfileInfo from "../components/Profile/ProfileInfo/ProfileInfo";
import OrderFilters from "../components/Profile/OrderFilters/OrderFilters";
import OrderCard from "../components/Profile/OrderCard/OrderCard";
import OrderDrawer from "../components/Profile/OrderDrawer/OrderDrawer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [drawerOrderId, setDrawerOrderId] = useState(null);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetMeQuery();

  const [logoutUser] = useLogoutUserMutation();
  const [filters, setFilters] = useState({});
  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetUserOrdersQuery(filters);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при выходе из профиля", error);
    }
  };

  useEffect(() => {
    if (userError && user === undefined) {
      navigate("/login");
      window.location.reload();
    }
  }, [userError, user, navigate]);

  if (userLoading || ordersLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile">
      <ProfileInfo user={user} onLogout={handleLogout} />
      <div className="profile__right">
        <h2 className="profile__title">Мои заказы</h2>
        <OrderFilters onFilter={setFilters} />

        {ordersError ? (
          <p className="profile__error">Ошибка загрузки заказов</p>
        ) : orders.length === 0 ? (
          <p className="profile__notfound">
            Нет заказов по выбранным параметрам
          </p>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={setDrawerOrderId}
            />
          ))
        )}
      </div>

      {drawerOrderId && (
        <OrderDrawer
          orderId={drawerOrderId}
          orderInfo={orders.find( order => order.id === drawerOrderId)}
          onClose={() => setDrawerOrderId(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
