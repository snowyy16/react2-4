import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import DataTable from "./dataTable";
import Header from "./Header";
import SideBar from "./SideBar";
import Page from "./Page";
import PageD from "./PageS";

function App() {
  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>
      <div className="menu">
        <SideBar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<PageD />} />
          <Route path="/projects" element={<Page />} />
          <Route path="/teams" element={<Page />} />
          <Route path="/analytics" element={<Page />} />
          <Route path="/messages" element={<Page />} />
          <Route path="/integrations" element={<Page />} />
          <Route path="*" element={<Page />} />
        </Routes>
      </div>
      <div className="footer">
        <DataTable />
      </div>
    </div>
  );
}

export default App;
