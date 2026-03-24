import { Drawer } from "antd";
import { useState } from "react";

const UserInfo = (props) => {
  const { userInfo, setOpenDrawer, openDrawer } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleUploadAvatar = (event) => {
    // Check if a file was selected
    if (!event.target.files || event.target.files.length === 0) {
      selectedFile(null);
      setPreview(null);
      return;
    }

    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here, e.g., send to backend
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  console.log("Preview URL:", preview);

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
          <div
            style={{
              height: "100px",
              width: "150px",
              border: "1px solid #ccc",
            }}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userInfo?.avatar}`}
              alt="User Avatar"
            />
          </div>

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
            <input
              type="file"
              hidden
              id="upload-btn"
              onChange={handleUploadAvatar}
            />
          </div>
          {/* Preview of the uploaded avatar */}
          {preview && (
            <div
              style={{
                width: "150px",
                border: "1px solid #ccc",
              }}
            >
              <img
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={preview}
                alt="User Avatar"
              />
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default UserInfo;
