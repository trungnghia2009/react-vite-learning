const TodoData = (props) => {
  console.log("TodoData props: ", props);

  // Object destructuring
  const { todoList } = props;

  return (
    <div className="todo-data">
      {todoList.map((item) => {
        return (
          <div className="todo-item" key={item.id}>
            <div>{item.name}</div>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
