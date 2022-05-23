import { FC, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TODO_ADDED } from "../Action";
import { State } from "../Store";
import TaskRow from "./TaskRow";
let i = 0;
type TodoProps = {};
type TodoList = { title: string; id: number; done: boolean };

const Todo: FC<TodoProps> = () => {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [isDarkModeEnable, setDarkModeEnale] = useState(false);

  const completedTask = todoList.filter((t) => t.done === true);
  const inCompletedTask = todoList.filter((t) => !t.done);
  const handelInput = (event: { target: { value: string } }) => {
    setTaskInput(event.target.value);
  };
  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  let incomTaskLabel;
  let comTaskLabel;

  if (inCompletedTask.length === 0) {
    incomTaskLabel = "No Todo here !";
  }
  if (completedTask.length === 0) {
    comTaskLabel = "No Todo done yet !";
  }

  const toAddTodo = (taskInput: string) => {
    ++i;
    setTodoList([...todoList, { title: taskInput, id: i, done: false }]);
    setTaskInput("");
  };
  const toMarkDone = (todo: TodoList) => {
    todo.done = true;
    setTodoList([...todoList]);
  };

  const toMarkUndone = (todo: TodoList) => {
    todo.done = false;
    setTodoList([...todoList]);
  };
  const toDeleteTodo = (todo: TodoList) => {
    const newTodoList = todoList.filter((t) => t.id !== todo.id);
    setTodoList(newTodoList);
  };
  const toToggleDarkMode = () => {
    setDarkModeEnale(!isDarkModeEnable);
  };
  const dispatchAdded = useDispatch();
  const updateAdded = () => {
    dispatchAdded({
      type: TODO_ADDED,
      payload: { title: taskInput, id: i, done: false },
    });
  };

  const doneSelector = (s: State) => s.todos.filter((t) => t.done);
  const todoSelector = (s: State) => s.todos.filter((t) => !t.done);

  const incomplete = useSelector(todoSelector);
  const complete = useSelector(doneSelector);
  console.log("incomplete", incomplete);
  console.log("complete", complete);

  const bgColor = isDarkModeEnable ? " bg-zinc-500" : "bg-yellow-500";
  const textColor = isDarkModeEnable ? " text-gray-300 " : "text-black";
  const bodyColor = isDarkModeEnable ? " bg-zinc-800 " : " bg-white";
  const darkModeIcon = isDarkModeEnable
    ? "  https://img.icons8.com/material-outlined/24/000000/sun--v1.png "
    : " https://img.icons8.com/ios-filled/24/000000/do-not-disturb-2.png ";

  return (
    <div className={" p-4 h-screen sm:px-44 " + bodyColor}>
      {
        <div className={"flex justify-between items-center p-2"}>
          <h1 className={"font-bold text-3xl " + textColor}> TO-DO LIST </h1>
          <div className="flex space-x-2">
            <h1 className={"font-medium " + textColor}>
              ToDo: {incomplete.length}
            </h1>
            <h1 className={"font-medium " + textColor}>
              Completed : {complete.length}
            </h1>
          </div>
          {
            <div className={"items-center  flex space-x-2 "}>
              <button
                onClick={toToggleDarkMode}
                className={" border rounded py-1 px-2 " + bgColor}>
                <img src={darkModeIcon} />
              </button>
            </div>
          }
        </div>
      }
      <h1 className={"my-2 font-bold text-xl " + textColor}>
        Things to get done :
      </h1>
      <h1 className="text-gray-400 font-thin my-2">{incomTaskLabel}</h1>
      {inCompletedTask.map((t) => (
        <TaskRow
          isDarkMode={isDarkModeEnable}
          todo={t}
          toDeleteTodo={toDeleteTodo}
          checked={false}
          OnChange={toMarkDone}
          key={t.id}
        />
      ))}
      {!isFormVisible && (
        <button
          className={" p-1 rounded-full  font-semibold px-3 " + bgColor}
          onClick={handleToggleForm}>
          + Add todo
        </button>
      )}
      {isFormVisible && (
        <div className="flex space-x-3 p-2">
          <input
            value={taskInput}
            onChange={handelInput}
            className={" border rounded p-2 "}
            placeholder="Add your Task here"
          />
          <button
            disabled={taskInput === ""}
            onClick={() => {
              toAddTodo(taskInput);
              handleToggleForm();
              updateAdded();
            }}
            className={" p-1 rounded  font-semibold px-3 " + bgColor}>
            Save
          </button>
          <button
            className={
              "p-1 rounded font-semibold px-3 border border-gray-200 " +
              textColor
            }
            onClick={handleToggleForm}>
            Cancle
          </button>
        </div>
      )}
      <h1 className={"my-2 font-bold text-xl " + textColor}>
        Things to get done :
      </h1>
      <h1 className="text-gray-400 font-thin my-2">{comTaskLabel}</h1>
      {completedTask.map((t) => (
        <TaskRow
          isDarkMode={isDarkModeEnable}
          toDeleteTodo={toDeleteTodo}
          todo={t}
          checked={true}
          key={t.id}
          OnChange={toMarkUndone}
        />
      ))}
    </div>
  );
};

Todo.defaultProps = {};

export default memo(Todo);
