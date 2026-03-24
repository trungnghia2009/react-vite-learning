import { Drawer } from "antd";

const UserInfo = (props) => {
  const { userInfo, setOpenDrawer, openDrawer } = props;

  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Drawer
      width={"30vw"}
      title="User Info"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={openDrawer}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p>Id: {userInfo?._id}</p>
        <p>Full name: {userInfo?.fullName}</p>
        <p>Email: {userInfo?.email}</p>
        <p>Phone number: {userInfo?.phone}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <p style={{ fontWeight: "bold" }}>Avatar</p>
          <img
            width={150}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userInfo?.avatar}`}
            alt="User Avatar"
          />
          <div>
            <label
              htmlFor="upload-btn"
              style={{
                display: "block",
                width: "fit-content",
                padding: "5px 10px",
                cursor: "pointer",
                background: "orange",
                borderRadius: "5px",
              }}
            >
              Upload Avatar
            </label>
            <input type="file" hidden id="upload-btn" />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default UserInfo;
