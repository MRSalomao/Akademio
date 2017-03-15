import React from 'react';

import "common/base.sass";

import Navbar from './Navbar';
import Footer from './Footer';

export default ({children}) => {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};
