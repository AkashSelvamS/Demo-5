import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"; // Styles specific to App component
import StockList from "./components/StockList"; // Importing the new StockList component
import DistributedList from "./components/DistributedList";
import SuppliersList from "./components/SupplierList";

const App = () => {
  const categories = ["Sports", "Books", "Electronics", "Clothing"];

  // Updated to include 10 entries
  const recentActivities = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    date: `2024-10-${(index + 1).toString().padStart(2, "0")}`, // Dates from 01 to 10
    billNo: `BILL00${index + 1}`,
    poNo: `PO00${index + 1}`,
    partyName: `Supplier ${String.fromCharCode(65 + index)}`, // A, B, C, ...
    institution: `Institution ${String.fromCharCode(65 + index)}`,
    department: `Department ${String.fromCharCode(65 + index)}`,
    particulars: `Item ${index + 1}`,
    qty: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
    uom: "pcs",
    remarks: index % 2 === 0 ? "Delivered" : "Pending", // Alternate remarks
  }));

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="dashboard">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Paavai Store Inventory</h1>
                  <Cards categories={categories} />
                  <Table title="Recent Activity" data={recentActivities} />
                </>
              }
            />
            {/* Add route for Stock List */}
            <Route path="/stocks" element={<StockList />} />
            <Route path="/distributed" element={<DistributedList />} />
            <Route path="/supplier" element={<SuppliersList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Sidebar = () => {
  const sidebarItems = [
    // "🏠 Home",
    { label: "📦 Stocks", path: "/stocks" },
    { label: "📊 Dashboard", path: "/" },
    { label: "🚚 Supplier", path:"/supplier"},
    { label: "📦 Distributed", path: "/distributed" },
    // "🔔 Notification",
  ];

  return (
    <div className="sidebar">
      {sidebarItems.map((item, index) =>
        typeof item === "object" ? (
          <Link to={item.path} key={index} className="sidebar-item">
            {item.label}
          </Link>
        ) : (
          <div key={index} className="sidebar-item">
            {item}
          </div>
        )
      )}
      <ProfileSection />
    </div>
  );
};

const ProfileSection = () => (
  <div className="profile-section">
    <img src="image.jpg" alt="Profile" className="profile-pic" />
    <div>Admin</div>
  </div>
);

const Cards = ({ categories }) => (
  <div className="cards-container">
    <Card title="Product/category" buttons={categories} />
    <Card
      title="Suppliers"
      buttons={["Supplier A", "Supplier B", "Supplier C", "Supplier D"]}
    />
    <LowStockCard />
  </div>
);

const Card = ({ title, buttons }) => (
  <div className="card">
    <h3>{title}</h3>
    <div className="card-buttons">
      {buttons.map((btn, index) => (
        <button key={index} className="category-btn">
          {btn}
        </button>
      ))}
    </div>
  </div>
);

const LowStockCard = () => (
  <div className="card">
    <h3>Low Stocks ⚠️</h3>
    <ul className="low-stock-list">
      {["Product-1", "Product-2", "Product-3"].map((product, index) => (
        <li key={index}>{product}</li>
      ))}
    </ul>
  </div>
);

const Table = ({ title, data }) => {
  const columns = [
    "S.no",
    "Date",
    "Bill No",
    "PO No",
    "Party Name",
    "Institution",
    "Department",
    "Particulars",
    "Qty",
    "UOM",
    "Remarks",
  ];

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>{title}</h3>
        <div className="filter-buttons">
          <button className="filter-btn">
            <span role="img" aria-label="purchased">
              🛒
            </span>{" "}
            Purchased
          </button>
          <button className="filter-btn">
            <span role="img" aria-label="distributed">
              📦
            </span>{" "}
            Distributed
          </button>
        </div>
      </div>
      <table className="activity-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.date}</td>
              <td>{item.billNo}</td>
              <td>{item.poNo}</td>
              <td>{item.partyName}</td>
              <td>{item.institution}</td>
              <td>{item.department}</td>
              <td>{item.particulars}</td>
              <td>{item.qty}</td>
              <td>{item.uom}</td>
              <td>{item.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
