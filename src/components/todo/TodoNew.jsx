import { useState } from "react";

const TodoNew = (props) => {
  const { addNewTodo } = props;

  // useState hook (getter, setter)
  // array destructuring
  const [valueInput, setValueInput] = useState("Eric");

  const handleOnChange = (name) => {
    console.log(">>>Handle on change", name);
    setValueInput(name);
  };

  const handleClickAdd = () => {
    console.log(">>>Handle click add", valueInput);
    addNewTodo(valueInput);
    setValueInput(""); // reset input after add new todo
  };

  return (
    <div className="todo-new">
      <input
        type="text"
        onChange={(event) => handleOnChange(event.target.value)}
        value={valueInput} // set default value for input (controlled component)
      />
      <button style={{ cursor: "pointer" }} onClick={handleClickAdd}>
        Add
      </button>
    </div>
  );
};

export default TodoNew;
