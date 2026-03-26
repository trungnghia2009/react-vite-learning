import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);

  // If user is logged in, render the children components (the protected page)
  if (user && user.id) {
    return props.children;
  }

  // If user is not logged in, show an unauthorized message
  return (
    <Result
      status="403"
      title="Unauthorized!"
      subTitle="You must be logged in to view this page."
      extra={
        <Link to="/">
          <Button type="primary">Back to Home Page</Button>
        </Link>
      }
    />
  );
};

export default PrivateRoute;
