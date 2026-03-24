import { Drawer } from "antd";

const UserInfo = (props) => {
  const { userInfo, setOpenDrawer, openDrawer } = props;

  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Drawer
      title="User Info"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={openDrawer}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <p>Id: {userInfo?._id}</p>
        <p>Full name: {userInfo?.fullName}</p>
        <p>Email: {userInfo?.email}</p>
        <p>Phone number: {userInfo?.phone}</p>
      </div>
    </Drawer>
  );
};

export default UserInfo;
