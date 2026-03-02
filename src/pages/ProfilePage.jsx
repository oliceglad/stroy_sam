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

const SkeletonProfileInfo = () => (
  <div style={{
    backgroundColor: "#fff",
    border: "1px solid #ededed",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    width: "100%",
  }}>
    <div className="skeleton" style={{ width: "80px", height: "80px", borderRadius: "50%", flexShrink: 0 }} />
    <div style={{ flex: "1 1 calc(100% - 250px)", minWidth: "200px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="skeleton" style={{ width: "150px", height: "24px", borderRadius: "4px" }} />
      <div className="skeleton" style={{ width: "120px", height: "16px", borderRadius: "4px" }} />
      <div className="skeleton" style={{ width: "140px", height: "16px", borderRadius: "4px" }} />
    </div>
    <div className="skeleton" style={{ flex: "1 1 100%", minWidth: "150px", maxWidth: "200px", height: "44px", borderRadius: "8px" }} />
  </div>
);

const SkeletonOrderCard = () => (
  <div style={{
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="skeleton" style={{ width: "120px", height: "24px" }} />
      <div className="skeleton" style={{ width: "90px", height: "24px", borderRadius: "6px" }} />
    </div>
    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="skeleton" style={{ width: "150px", height: "16px" }} />
      <div className="skeleton" style={{ width: "100px", height: "20px" }} />
    </div>
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [drawerOrderId, setDrawerOrderId] = useState(null);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
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
    if (userError && userFetchError?.status === 401) {
      navigate("/login");
      window.location.reload();
    }
  }, [userError, userFetchError, navigate]);

  const renderProfileLeft = () => {
    if (userLoading) {
      return <SkeletonProfileInfo />;
    }
    return <ProfileInfo user={user} onLogout={handleLogout} />;
  };

  return (
    <div className="profile">
      <div className="profile__left">
        {renderProfileLeft()}
      </div>
      <div className="profile__right">
        <h2 className="profile__title">Мои заказы</h2>
        <OrderFilters onFilter={setFilters} />

        {ordersLoading ? (
          <div>
            <SkeletonOrderCard />
            <SkeletonOrderCard />
            <SkeletonOrderCard />
          </div>
        ) : ordersError ? (
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
          orderInfo={orders.find((order) => order.id === drawerOrderId)}
          onClose={() => setDrawerOrderId(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
