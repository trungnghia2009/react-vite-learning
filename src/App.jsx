import "./components/todo/todo.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountInfoAPI } from "./services/api.service";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchUserInfo = async () => {
    const res = await getAccountInfoAPI();
    await delay(300); // Simulate network delay
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };

  return (
    <>
      {isAppLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header></Header>
          <Outlet></Outlet>
          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default App;
