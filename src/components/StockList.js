import React, { useState } from "react";
import "./StockList.css"; // Import the CSS
import { FaPrint, FaSearch } from "react-icons/fa"; // Importing icons from react-icons

const StockList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("particulars"); // Default search option

  // Dummy data for the stocks
  const stockData = [
    { sNo: 1, particulars: "LONG SIZE NOTE", openingStock: 10, purchasedQty: 80, salesQty: 20, balance: 60, remarks: "NIL" },
    { sNo: 2, particulars: "BROWN TAPE", openingStock: 35, purchasedQty: 65, salesQty: 44, balance: 11, remarks: "NIL" },
    { sNo: 3, particulars: "PENCIL", openingStock: 45, purchasedQty: 56, salesQty: 2, balance: 54, remarks: "NIL" },
    { sNo: 4, particulars: "CHALK BOX", openingStock: 67, purchasedQty: 74, salesQty: 10, balance: 64, remarks: "NIL" },
    { sNo: 5, particulars: "SCISSOR BIG SIZE", openingStock: 65, purchasedQty: 50, salesQty: 25, balance: 25, remarks: "NIL" },
    { sNo: 1, particulars: "LONG SIZE NOTE", openingStock: 10, purchasedQty: 80, salesQty: 20, balance: 60, remarks: "NIL" },
    { sNo: 2, particulars: "BROWN TAPE", openingStock: 35, purchasedQty: 65, salesQty: 44, balance: 11, remarks: "NIL" },
    { sNo: 3, particulars: "PENCIL", openingStock: 45, purchasedQty: 56, salesQty: 2, balance: 54, remarks: "NIL" },
    { sNo: 4, particulars: "CHALK BOX", openingStock: 67, purchasedQty: 74, salesQty: 10, balance: 64, remarks: "NIL" },
    { sNo: 5, particulars: "SCISSOR BIG SIZE", openingStock: 65, purchasedQty: 50, salesQty: 25, balance: 25, remarks: "NIL" },
  ];

  // Filter the stock data based on the search term and selected search option
  const filteredStockData = stockData.filter((stock) =>
    stock[searchOption].toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stock-list">
      {/* Header section */}
      <h1>Paavai Inventory Management</h1>
      <div className="header">
        <h2>Stocks list</h2>
        <div className="search-container">
          <select 
            value={searchOption} 
            onChange={(e) => setSearchOption(e.target.value)} 
            className="search-select"
          >
            <option value="particulars">Category</option>
            <option value="remarks">Remarks</option>
            <option value="openingStock">Opening Stock</option>
            <option value="purchasedQty">Purchased Quantity</option>
            <option value="salesQty">Sales Quantity</option>
            <option value="balance">Balance</option>
          </select>
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>
          <FaPrint className="print-icon" />
        </div>
      </div>

      {/* Table to display stock data */}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Particulars</th>
            <th>Opening Stocks</th>
            <th>Purchased Qty</th>
            <th>Sales Qty</th>
            <th>Balance</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {filteredStockData.map((stock) => (
            <tr key={stock.sNo}>
              <td>{stock.sNo}</td>
              <td>{stock.particulars}</td>
              <td>{stock.openingStock}</td>
              <td>{stock.purchasedQty}</td>
              <td>{stock.salesQty}</td>
              <td>{stock.balance}</td>
              <td>{stock.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
