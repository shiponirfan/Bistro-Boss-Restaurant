import { useEffect, useState } from "react";

const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  useEffect(() => {
    fetch("/public/menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setMenuLoading(false);
      });
  }, []);
  return [menu, menuLoading];
};

export default useMenu;
