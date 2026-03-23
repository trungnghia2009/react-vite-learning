import { Table } from "antd";

const UserTable = (props) => {
  const { userData } = props;

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

  return <Table columns={columns} dataSource={userData} rowKey={"_id"} />;
};

export default UserTable;
