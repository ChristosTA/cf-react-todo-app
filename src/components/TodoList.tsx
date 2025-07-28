import {Edit, Save, Trash2, X} from "lucide-react";
import type{TodoListProps} from "../types.ts";
import { useState } from "react";


const TodoList = ({todos, dispatch}:TodoListProps) => {
const [editId, setEditId] = useState<number|null>(null);
const [editText, setEditText] = useState("");

const handleDelete = (id:number) => () => {
    dispatch({type: "DELETE", payload: id})
}

const handleEdit = (id:number , text:string ) =>() => {
    setEditId(id);
    setEditText(text);
}

const handleCancel = () => {
        setEditId(null);
        setEditText("");
}

const handleSave = (id: number ) => () => {
        dispatch({type: "EDIT", payload: {id,   newText: editText}})
        setEditId(null);
        setEditText("");

}


    return(
        <>
            <ul className="space-y-2">
                {todos.map(
                todo => (
                <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    { editId === todo.id ? (
                        <>

                            <div className="flex flex-1 gap-2">
                                <input
                                    type="text"
                                    value={editText} className="border rounded p-1 flex-1"
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button
                                    onClick={handleSave(todo.id)}
                                    className="text-cf-gray">
                                    <Save size={18}/>
                                </button>

                                <button onClick={handleCancel} className="text-cf-dark-red ">
                                    <X size={18} />
                                </button>
                            </div>

                        </>
                    ) :  (
                        <>
                            <span>{todo.text}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleEdit(todo.id, todo.text)}
                                    className="text-cf-gray">
                                    <Edit size={18}/>
                                </button>

                                <button onClick={handleDelete(todo.id)} className="text-cf-dark-red ">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </>

                    )
                    }
                </li>
                ))}
            </ul>
        </>
    )
}
export default TodoList