import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setinput] = useState("");
  const [todos, setTodos] = useState([
    "Take dogs for walk",
    "Take the rubbish out",
  ]);

  const handleAddTodo = (event) => {
    //will fire whn we click add todo button
    event.preventDefault(); //Stops page refresh
    console.log("👽", "it works");
    setTodos([...todos, input]);
    setinput("");
  };

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <form>
        <input
          value={input}
          onChange={(event) => setinput(event.target.value)}
        />
        <button type="submit" onClick={handleAddTodo}>
          Add todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
