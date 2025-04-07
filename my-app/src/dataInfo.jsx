import React, { useState, useEffect } from "react";
import "./App.css";
import "./DataInfo.css";

function DataInfo() {
  const [summary, setSummary] = useState([]);
  //callapi
  useEffect(() => {
    fetch("https://67f3f732cbef97f40d2cdc6f.mockapi.io/dashboardSummary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Fetch lỗi:", err));
  }, []);
  // mapicon
  const iconMap = {
    Turnover: "/icons/shopping-cart.png",
    Profit: "/icons/dollar.png",
    Customers: "/icons/user.png",
  };
  return (
    <div>
      <h1 id="overview">
        <img
          src="/icons/square.png"
          alt="Overview Icon"
          width="24"
          height="24"
          style={{ marginRight: "8px" }}
        />
        Overview
      </h1>

      <div className="info-cards">
        {summary.map((item, index) => (
          <div className="info-card" key={index} id={item.label.toLowerCase()}>
            <div className="up">
              <h3>{item.label}</h3>
              <p>${item.total.toLocaleString()}</p>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "17px",
                  fontWeight: "500",
                  marginTop: "15px",
                }}
              >
                {item.changePercent >= 0 ? (
                  <span style={{ color: "green" }}>▲</span>
                ) : (
                  <span style={{ color: "red" }}>▼</span>
                )}
                <span
                  style={{ color: item.changePercent >= 0 ? "green" : "red" }}
                >
                  {Math.abs(item.changePercent)}%
                </span>
                <span style={{ color: "black" }}>period of change</span>
              </span>
            </div>
            <div className="icon-container">
              <img
                src={iconMap[item.label] || "/icons/default.png"}
                alt={`${item.label} Icon`}
                width="20"
                height="20"
                style={{
                  borderRadius: "8px",
                  padding: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataInfo;
