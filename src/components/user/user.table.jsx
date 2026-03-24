import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUser from "./update.user";
import UserInfo from "./user.info";
import { useState } from "react";

const UserTable = (props) => {
  const { userData, loadUser } = props;

  // State for Update User Modal
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  // State for User Info Drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            setUserInfo(record);
            setOpenDrawer(true);
          }}
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={userData} rowKey={"_id"} />;
      <UpdateUser
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <UserInfo
        userInfo={userInfo}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
      />
    </>
  );
};

export default UserTable;
