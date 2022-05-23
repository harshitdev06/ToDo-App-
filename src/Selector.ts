import { useSelector } from "react-redux";
import { State } from "./Store";

export const doneSelector = (s: State) => s.todos.filter((t) => t.done);
export const todoSelector = (s: State) => s.todos.filter((t) => !t.done);

export const incomplete = useSelector(todoSelector)
export const complete = useSelector(doneSelector)
