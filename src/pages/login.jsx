import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(">>> Check values: ", values);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend style={{ textAlign: "center", fontSize: "1.5em" }}>
            Login to your account
          </legend>
          <Form form={form} layout="vertical" name="basic" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                <Link to="/">Go to Home</Link>
              </div>
            </Form.Item>
          </Form>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Not have an account?{" "}
            <Link to="/register">
              Register now <ArrowRightOutlined />
            </Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
