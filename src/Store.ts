import { createStore, Reducer } from "redux";
import {
  TODO_ADDED,
  TODO_DELETED,
  TODO_MARKED_DONE,
  TODO_MARKED_UNDONE,
} from "./Action";
import { Todo } from "./Models/Todo";
export type State = {
  todos: Todo[];
};
const intialState: State = {
  todos: [],
};

const reducer: Reducer<State> = (currentState = intialState, action) => {
  console.log(currentState, action);
  switch (action.type) {
    case TODO_MARKED_DONE: {
      const newTodoArray = currentState.todos.map((t) => {
        if (t.id === action.payload) {
          return { ...t, done: true };
        }
        return t;
      });
      return { ...currentState, todos: newTodoArray };
    }
    case TODO_MARKED_UNDONE: {
      const newTodoArray = currentState.todos.map((t) => {
        if (t.id === action.payload) {
          return { ...t, done: false };
        }
        return t;
      });
      return { ...currentState, todos: newTodoArray };
    }
    case TODO_ADDED: {
      return {
        ...currentState,
        todos: [...currentState.todos, action.payload],
      };
    }
    case TODO_DELETED: {
      const newTodoArray = currentState.todos.filter((t) => {
        return t.id !== action.payload;
      });
      return { ...currentState, todos: newTodoArray };
    }
    default: {
      return currentState;
    }
  }
};
const store = createStore(reducer);
export default store;
