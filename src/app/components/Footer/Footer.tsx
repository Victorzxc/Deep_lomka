import React from 'react';
import styles from './Footer.module.scss'; 
const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Apex Vortex</p>
    </footer>
  );
};

export default Footer;