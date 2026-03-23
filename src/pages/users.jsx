import UserTable from "../components/user/user.table";
import UserForm from "../components/user/user.form";
import { fetchAllUsersAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [userData, setUserData] = useState([]);

  // empty dependency array [] => only call 1 time when component mounts
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetchAllUsersAPI();
    setUserData(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser} />
      <UserTable userData={userData} />
    </div>
  );
};

export default UsersPage;
