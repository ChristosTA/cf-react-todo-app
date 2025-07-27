
import TodoForm from "./todoForm.tsx";
import TodoList from "./TodoList.tsx";
import {useReducer} from "react";

type TodoProps = {
    id: number;
    text: string;
}

type Action =
    | {type: "ADD"; payload: string }
    | {type: "DELETE"; payload: number}


const todoReducer = (state:TodoProps[] , action:Action): TodoProps[] => {
    switch (action.type) {
        case "ADD":
            const newToDo: TodoProps = {
                id: Date.now(),
                text: action.payload,
            }
            return [...state, newToDo];

        case "DELETE":
            return state.filter(todo => todo.id !== action.payload)
        default:
            return state;
    }
};

const Todo  = () => {

    const [todos, dispatch] = useReducer(todoReducer, []);


    return(
        <>
            <div className="max-w-sm mx-auto p-6">
               <h1 className="text-center text-2xl">To-Do List</h1>
                <TodoForm dispatch={dispatch} />
                <TodoList todos={todos} dispatch={dispatch} />
            </div>
        </>
    )
}
export default Todo;