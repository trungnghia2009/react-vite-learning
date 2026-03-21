import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Learning React" },
    // { id: 2, name: "Learning JavaScript" },
    // { id: 3, name: "Watching YouTube" },
  ]);

  const addNewTodo = (name) => {
    // check empty
    if (!name) return;

    // add new todo to list
    const newId = randomIntFromInterval(1, 10000000);
    setTodoList([...todoList, { id: newId, name }]);
  };

  // Function to generate a random integer between min and max (inclusive)
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const deleteTodo = (id) => {
    const deleteItem = todoList.filter((item) => item.id !== id);
    setTodoList(deleteItem);
  };

  return (
    <>
      <Header></Header>
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew addNewTodo={addNewTodo} />
        {todoList.length > 0 ? (
          <TodoData todoList={todoList} deleteTodo={deleteTodo} />
        ) : (
          <div className="todo-image">
            <img src={reactLogo} className="logo" alt="React Logo" />
          </div>
        )}
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default App;
