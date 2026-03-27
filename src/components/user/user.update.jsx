import { useEffect, useState } from "react";
import { Input, Modal, notification } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UserUpdate = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;

  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setFullName(dataUpdate.fullName || "");
      setId(dataUpdate._id || "");
      setPhone(dataUpdate.phone || "");
    }
  }, [dataUpdate]);

  const handleUpdateUser = async () => {
    const res = await updateUserAPI(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "User Updated",
        description: `User ${res.data.fullName} updated successfully!`,
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "User Update Failed",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setId("");
    setPhone("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update User"
      okText="SAVE"
      open={isModalUpdateOpen}
      onOk={handleUpdateUser}
      onCancel={resetAndCloseModal}
      maskClosable={false}
    >
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Id</span>
          <Input type="id" value={id} disabled />
        </div>
        <div>
          <span>Full Name</span>
          <Input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="input Full Name"
          />
        </div>
        <div>
          <span>Phone Number</span>
          <Input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="input Phone Number"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UserUpdate;
