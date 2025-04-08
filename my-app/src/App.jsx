import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import DataTable from "./dataTable";
import Header from "./Header";
import SideBar from "./sideBar";
import Page from "./Page";
import Page2 from "./Page_2";

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
          <Route path="/dashboard" element={<Page2 />} />
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
