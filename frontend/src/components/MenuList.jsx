import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function MenuList() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.get("/menu").then(res => {
      console.log("MENU DATA:", res.data);
      setMenu(res.data);
    }).catch(err => {
      console.error("API ERROR:", err);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>MENU UI TEST</h2>

      {menu.length === 0 && <p>Menu is empty</p>}

      {menu.map(item => (
        <div
          key={item._id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}
