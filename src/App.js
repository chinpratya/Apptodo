import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState("");
  const [editTodo, setEditTodo] = useState([]);
  // const [editing, setEditing] = useState([])
  const [Todo, setTodo] = useState(() => {
    const Todo = localStorage.getItem("Todo");
    if (Todo) {
      return JSON.parse(Todo);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify(Todo));
  }, [Todo]);

  function AddTodo(e) {
    e.preventDefault();
    if (todos !== "") {
      setTodo([{ id: Todo.length + 1, data: todos.trim(),complete:false}, ...Todo]);
      document.getElementById("inputTodo").value = "";
      console.log(Todo);
    }
  }
  function EditTodo() {
    const listTodo = Todo.map((todo) => {
      return todo.id === editTodo.id ? editTodo : todo;
    });
    console.log("55555");
    console.log(listTodo);
    setTodo(listTodo);
  }
  function DeleteTodo(id) {
    const Todonew = Todo.filter((todo) => todo.id !== id);
    setTodo(Todonew);
    console.log(Todonew);
  }
  function checkComplete(todo){
    const Comp = {
        id: todo.id,
        data : todo.data,
        complete : true
      }
    const compelete = Todo.map((Todo) => {
      
      return Todo.id === todo.id ? Comp : Todo;
    });
    console.log(compelete);
    // console.log(compelete);
    setTodo(compelete);
  }
  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="inputcontent">
          <textarea
            className="inputTodo"
            name="inputTodo"
            id="inputTodo"
            cols="30"
            rows="10"
            onChange={(e) => setTodos(e.target.value)}
          ></textarea>
          <button className="addTodo" onClick={AddTodo}>
            Add
          </button>
        </div>
      <div className="container">
        

        <div className="containerTodo">
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit Todo
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <textarea
                    className="inputEdit"
                    type="text"
                    onChange={(e) =>
                      setEditTodo({ id: editTodo.id, data: e.target.value,complete:editTodo.complete })
                    }
                    value={editTodo.data}
                    placeholder="Edit Todo"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={EditTodo}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
          <h1>Todo List</h1>
            {Todo.map((Todo) => ( !Todo.complete ?(<div key={Todo.id} className="content">
                {/* <button onClick={()=>checkComplete(Todo)}>com</button> */}
                <img src={require("../src/assets/select.png")} alt=""  className="imgCheck" onClick={()=>checkComplete(Todo)}/>
                <p className="detailTodo">
                  {Todo.data}
                </p>
                {/* <input type="submit" /> */}
                <button
                  className="btnDelete"
                  onClick={() => DeleteTodo(Todo.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="editTodo"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => setEditTodo(Todo)}
                >
                  Edit
                </button>
              </div>):''
              
              
            ))}
          </div>
          
        </div>
        <div className="containerTodo">
          <h1>compelete</h1>
          <div>
            {Todo.map((Todo) => ( Todo.complete ?
              (<div key={Todo.id} className="content">
                <label htmlFor="Read" className="detailTodoCom">
                  {Todo.data}
                </label>
                {/* <input type="submit" /> */}
                <button
                  className="btnDelete"
                  onClick={() => DeleteTodo(Todo.id)}
                >
                  Delete
                </button>
                {/* <button
                  type="button"
                  className="editTodo"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => setEditTodo(Todo)}
                >
                  Edit
                </button> */}
              </div>) :'' 
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
