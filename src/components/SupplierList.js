import React, { useState } from "react";
import "./SupplierList.css"; // Ensure your CSS file contains necessary styles
import { FaPrint, FaUpload, FaSearch } from "react-icons/fa"; // Import the FaUpload icon from react-icons

const SuppliersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("category"); // Default search option set to 'category'

  // Dummy data for suppliers
  const suppliersData = [
    { sNo: 1, poNo: "PO123", billNo: "B001", partyName: "ABC Corp", institution: "PEC", dept: "IT", particular: "Notebooks", qty: 50, uom: "Nos", remarks: "Delivered" },
    { sNo: 2, poNo: "PO124", billNo: "B002", partyName: "XYZ Pvt Ltd", institution: "PCE", dept: "EEE", particular: "Pens", qty: 100, uom: "Nos", remarks: "Pending" },
    { sNo: 3, poNo: "PO125", billNo: "B003", partyName: "LMN Pvt Ltd", institution: "PCT", dept: "CSE", particular: "Markers", qty: 75, uom: "Box", remarks: "Delivered" },
    { sNo: 4, poNo: "PO126", billNo: "B004", partyName: "PQR Corp", institution: "Pharma", dept: "School", particular: "Chalks", qty: 200, uom: "Box", remarks: "Pending" },
    { sNo: 5, poNo: "PO127", billNo: "B005", partyName: "STU Traders", institution: "School", dept: "Nursing", particular: "Staplers", qty: 40, uom: "Nos", remarks: "Delivered" },
  ];

  // Filter the suppliers data based on the search term and selected search option
  const filteredSuppliersData = suppliersData.filter((supplier) => {
    if (searchOption === "category") {
      return true; // Show all rows when category is selected
    } else {
      return supplier[searchOption]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // Function to handle print
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Suppliers List</title>");
    printWindow.document.write("</head><body><h1>Suppliers List</h1>");
    printWindow.document.write("<table border='1' style='width:100%; border-collapse:collapse;'>");
    printWindow.document.write("<thead><tr><th>S.No</th><th>Date</th><th>PO No</th><th>Bill No</th><th>Party Name</th><th>Institution</th><th>Dept</th><th>Particular</th><th>Qty</th><th>UOM</th><th>Remarks</th></tr></thead><tbody>");

    filteredSuppliersData.forEach(supplier => {
      printWindow.document.write(`<tr>
        <td>${supplier.sNo}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>${supplier.poNo}</td>
        <td>${supplier.billNo}</td>
        <td>${supplier.partyName}</td>
        <td>${supplier.institution}</td>
        <td>${supplier.dept}</td>
        <td>${supplier.particular}</td>
        <td>${supplier.qty}</td>
        <td>${supplier.uom}</td>
        <td>${supplier.remarks}</td>
      </tr>`);
    });

    printWindow.document.write("</tbody></table></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Function to handle download as CSV
  const handleDownload = () => {
    const csvRows = [];
    const headers = ["S.No", "Date", "PO No", "Bill No", "Party Name", "Institution", "Dept", "Particular", "Qty", "UOM", "Remarks"];
    csvRows.push(headers.join(","));

    filteredSuppliersData.forEach(supplier => {
      const row = [
        supplier.sNo,
        new Date().toLocaleDateString(), // Current date
        supplier.poNo,
        supplier.billNo,
        supplier.partyName,
        supplier.institution,
        supplier.dept,
        supplier.particular,
        supplier.qty,
        supplier.uom,
        supplier.remarks,
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "suppliers_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="suppliers-list">
      {/* Header section */}
      <h1>Paavai Store Inventory</h1>
      <div className="header">
        <h2>Suppliers List</h2>
        <div className="search-container">
          {/* Dropdown for selecting search filter */}
          <select 
            value={searchOption} 
            onChange={(e) => setSearchOption(e.target.value)} 
            className="search-select"
          >
            <option value="category">Category</option> {/* Default option */}
            <option value="partyName">Party Name</option>
            <option value="institution">Institution</option>
            <option value="dept">Department</option>
            <option value="particular">Particular</option>
            <option value="remarks">Remarks</option>
          </select>
          
          {/* Search input */}
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
              disabled={searchOption === "category"} // Disable input when 'Category' is selected
            />
            {/* Print and Download icons */}
            <FaPrint className="print-icon" onClick={handlePrint} />
            <FaUpload className="upload-icon" onClick={handleDownload} />
          </div>
        </div>
      </div>

      {/* Table for displaying suppliers data */}
      <table className="suppliers-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>PO No</th>
            <th>Bill No</th>
            <th>Party Name</th>
            <th>Institution</th>
            <th>Dept</th>
            <th>Particular</th>
            <th>Qty</th>
            <th>UOM</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliersData.map((supplier) => (
            <tr key={supplier.sNo}>
              <td>{supplier.sNo}</td>
              <td>{new Date().toLocaleDateString()}</td> {/* Assuming the date is the current date */}
              <td>
                <FaUpload className="inline-upload-icon" /> {supplier.poNo}
              </td>
              <td>
                <FaUpload className="inline-upload-icon" /> {supplier.billNo}
              </td>
              <td>{supplier.partyName}</td>
              <td>{supplier.institution}</td>
              <td>{supplier.dept}</td>
              <td>{supplier.particular}</td>
              <td>{supplier.qty}</td>
              <td>{supplier.uom}</td>
              <td>{supplier.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersList;
