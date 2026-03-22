import { Input, Button } from "antd";
import { useState } from "react";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCreateUser = () => {
    // Handle user creation logic here
    console.log("Creating user with details:", {
      fullName,
      email,
      password,
      phoneNumber,
    });
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
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
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
