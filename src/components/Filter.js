import React from 'react';
import './Filter.css';

const Inventory = () => {
  return (
    <div className="inventory-container">
      <h1>Paavai Store Inventory</h1>
      <div className="inventory-grid">
        <Dropdown title="Dept" options={["IT", "EEE", "CSE", "ECE", "School", "Nursing"]} />
        <Dropdown title="Institution" options={["PEC", "PCE", "PCT", "Pharma", "School", "Arts"]} />
        <Dropdown title="Year of Study" options={["1st year", "2nd year", "3rd year", "4th year", "School", "Teaching"]} />
        <Dropdown title="Period" options={["Particular Date", "Range", "Last 1 week", "Last 1 month", "Last 6 months", "Last 1 year"]} />
      </div>
      <button className="back-button">Back</button>
    </div>
  );
};

const Dropdown = ({ title, options }) => (
  <div className="dropdown">
    <button className="dropdown-btn">{title} <span>&#x25BC;</span></button>
    <div className="dropdown-content">
      {options.map(option => (
        <button key={option} className="dropdown-option">{option}</button>
      ))}
    </div>
  </div>
);

export default Inventory;
