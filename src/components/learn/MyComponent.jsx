// Fragmented code, do not edit

import "./style.css";

const MyComponent = () => {
  const myName = "Nghia"; // String
  const myAge = 18; // Number
  const myInfo = {
    name: "Nghia",
    age: 18,
    address: "123 Main St",
  };
  return (
    <>
      <div
        className="parent"
        style={{
          color: "yellow",
        }}
      >
        My first Component {myName} - {myAge} - {myInfo.name} - {myInfo.age}
      </div>
      <div className="child">
        My first Component 2 - {JSON.stringify(myInfo)}
      </div>
      <div>{console.log("Render child")}</div>
    </>
  );
};

export default MyComponent;
