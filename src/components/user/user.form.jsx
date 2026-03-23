import { Input, Button, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreateUser = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "User Created",
        description: `User ${res.data.fullName} created successfully!`,
      });
    } else {
      notification.error({
        message: "User Creation Failed",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
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
          <span>Email</span>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="input Email"
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="input password"
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
        <div>
          <Button type="primary" onClick={handleCreateUser}>
            Create User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
