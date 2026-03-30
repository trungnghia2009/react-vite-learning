import { Drawer, Button, App } from "antd";
import { useState } from "react";
import { uploadImageAPI, updateUserAPI } from "../../services/api.service";

const UserInfo = (props) => {
  const { userInfo, setOpenDrawer, openDrawer, loadUser } = props;
  const { notification } = App.useApp();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setOpenDrawer(false);
    setPreview(null);
  };

  const handlePreviewAvatar = (event) => {
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

  const handleUploadAvatar = async () => {
    // Step 1: upload file
    const resUpload = await uploadImageAPI(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      // Step 2: update user with new avatar
      const resUpdate = await updateUserAPI(
        userInfo._id,
        userInfo.fullName,
        userInfo.phone,
        newAvatar,
      );
      if (resUpdate.data) {
        notification.success({
          message: "Avatar Updated",
          description: `User avatar updated successfully!`,
        });
        setPreview(null);
        onClose();
        await loadUser();
      } else {
        notification.error({
          message: "User Update Failed",
          description: JSON.stringify(resUpdate.message),
        });
      }
    } else {
      notification.error({
        message: "Avatar Upload Failed",
        description: JSON.stringify(resUpload.message),
      });
      return;
    }
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
                marginBottom: "10px",
              }}
            >
              Upload Avatar
            </label>
            <input
              type="file"
              hidden
              id="upload-btn"
              onChange={handlePreviewAvatar}
              onClick={(event) => {
                event.target.value = null;
              }}
            />
          </div>
          {/* Preview of the uploaded avatar */}
          {preview && (
            <>
              <div
                style={{
                  width: "150px",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={preview}
                  alt="User Avatar"
                />
              </div>
              <Button
                type="primary"
                style={{ width: "fit-content" }}
                onClick={handleUploadAvatar}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default UserInfo;
