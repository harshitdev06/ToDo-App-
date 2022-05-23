import { FC, memo } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { TODO_DELETED, TODO_MARKED_DONE, TODO_MARKED_UNDONE } from "../Action";
type todo = {
  title: string;
  id: number;
  done: boolean;
};
type TaskRowProps = {
  todo: todo;
  OnChange: (t: todo) => void;
  checked: boolean;
  isDarkMode: boolean;
  toDeleteTodo: (t: todo) => void;
};

const TaskRow: FC<TaskRowProps> = ({
  toDeleteTodo,
  checked,
  isDarkMode,
  todo,
  OnChange,
}) => {
  const oncheckedDispacher = useDispatch();
  const onUnCheckedDispacher = useDispatch();
  const onTodoDelete = useDispatch();
  const updateCheckedDone = (t: todo) => {
    oncheckedDispacher({ type: TODO_MARKED_DONE, payload: t.id });
  };
  const updateUnchecked = (t: todo) => {
    onUnCheckedDispacher({ type: TODO_MARKED_UNDONE, payload: t.id });
  };
  const updateDeletedTodo = (t: todo) => {
    onTodoDelete({ type: TODO_DELETED, payload: t.id });
  };
  const reduxFunc = checked ? updateUnchecked : updateCheckedDone;
  return (
    <>
      <div className={"flex justify-between items-center p-4 "}>
        <div className="flex items-center space-x-2">
          <input
            className="accent-yellow-400 h-4 w-4 "
            defaultChecked={checked}
            onChange={() => {
              OnChange(todo);
              reduxFunc(todo);
            }}
            type="checkbox"
          />
          <h1
            className={
              "text-lg font-mono font-semibold " +
              (isDarkMode && " text-white ") +
              (todo.done && " line-through ")
            }>
            {todo.title}
          </h1>
          <TiDelete
            onClick={() => {
              updateDeletedTodo(todo);
              toDeleteTodo(todo);
            }}
          />
        </div>
      </div>
    </>
  );
};

TaskRow.defaultProps = {};

export default memo(TaskRow);
