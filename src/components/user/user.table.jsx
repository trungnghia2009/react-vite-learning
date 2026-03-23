import { Table } from "antd";
import { fetchAllUsersAPI } from "../../services/api.service";
import { useEffect, useState } from "react";

const UserTable = () => {
  const [userData, setUserData] = useState([]);

  // empty dependency array [] => only call 1 time when component mounts
  useEffect(() => {
    loadUser();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const loadUser = async () => {
    const res = await fetchAllUsersAPI();
    setUserData(res.data);
  };

  return <Table columns={columns} dataSource={userData} rowKey={"_id"} />;
};

export default UserTable;
