import React, { useState } from 'react';
import './Sidebar.css'; // Import your CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the open/close state of the sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      {/* Your sidebar content goes here */}
    </div>
  );
};

export default Sidebar;
