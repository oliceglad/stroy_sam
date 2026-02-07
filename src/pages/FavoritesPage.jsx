import React from "react";

const FavoritesPage = () => {
  return (
    <div className="favorites">
      <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
        Избранное
      </h1>
      <p style={{ color: "grey" }}>Список избранного пока пуст</p>
    </div>
  );
};

export default FavoritesPage;
