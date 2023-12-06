import React from 'react';
import './BackArrow.css';
import { Link } from 'react-router-dom'; // If you're using React Router
const BackArrow = () => {
  return (
    <Link to="/"> {/* Replace "/previous-page" with the actual URL you want to navigate to */}
      <div className="back-arrow">
        <span>&#8592;</span> {/* Unicode arrow character */}
      </div>
    </Link>
  );
};

export default BackArrow;
