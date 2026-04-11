import { memo } from 'react';
import './header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order your favorite meals now!
        </h2>
        <p>Delicious food delivered to your doorstep.</p>
        <button className="view-menu-btn">View Menu</button>
      </div>
      
      
    </div>
  );
};

export default memo(Header);