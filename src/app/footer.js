import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>This is the footer.</p>
    </footer>
  );
};

const footerStyle = {
  background: 'black',
  padding: '20px',
  position:"relative",
  textAlign: 'center',
};

export default Footer;