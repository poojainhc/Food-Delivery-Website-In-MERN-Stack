import { memo } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h2>Explore Menu</h2>
      <p className="explore-menu-text">
        Choose from a variety of delicious dishes
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="explore-menu-list-item"
              onClick={() => {
                setCategory(prev=> prev === item.menu_name ? "All" : item.menu_name);
              }}
            >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={category === item.menu_name ? "active" : ""}
            />
            <p>{item.menu_name}</p>
          </div>
          
        )})}
      </div>

      <hr />
    </div>
  );
};

export default memo(ExploreMenu);
