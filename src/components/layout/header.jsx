import { Link, useNavigate } from "react-router-dom";
import { Menu, message, Popconfirm } from "antd";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  BookOutlined,
  LoginOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutUserAPI } from "../../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const onLogout = async () => {
    console.log("Logging out...");
    const res = await logoutUserAPI();
    if (res.data) {
      localStorage.removeItem("access_token"); // Remove token from localStorage
      setUser({}); // Clear user context
      navigate("/"); // Redirect to home page after logout
      message.success("Logout successful!");
    } else {
      console.error("Logout failed:", res.message);
    }
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/users">Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to="/books">Books</Link>,
      key: "books",
      icon: <BookOutlined />,
    },

    // Show login link only if user is not logged in
    /// ... means spread operator, used to conditionally add the login menu item if user is not logged in
    ...(!user.id
      ? [
          {
            label: <Link to="/login">Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    ...(user.id
      ? [
          {
            label: `Welcome, ${user.fullName}`,
            key: "settings",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: (
                  <Popconfirm
                    title="Logout"
                    description="Are you sure you want to logout?"
                    onConfirm={onLogout}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                    placement="right"
                  >
                    <span>Logout</span>
                  </Popconfirm>
                ),
                key: "logout",
              },
            ],
          },
        ]
      : []),
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
