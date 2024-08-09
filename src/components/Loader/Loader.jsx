import React from 'react';
import './loader.css'; // Make sure the path to your CSS file is correct

const Loader = () => {
  return (
    <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
