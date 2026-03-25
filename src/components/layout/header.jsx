import { NavLink, Link } from "react-router-dom";
import { Menu } from "antd";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: <NavLink to="/">Home</NavLink>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <NavLink to="/users">Users</NavLink>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <NavLink to="/books">Books</NavLink>,
      key: "books",
      icon: <BookOutlined />,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/login">Login</Link>,
          key: "login",
        },
        {
          label: "Logout",
          key: "logout",
        },
      ],
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
