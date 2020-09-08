import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setinput] = useState("");
  const [todos, setTodos] = useState([]);

  //When app loads, listen to the database and fetch new todos as they get added or removed
  useEffect(() => {
    //fires when app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().todo }))
        );
      });
  }, []);

  const handleAddTodo = (event) => {
    //will fire whn we click add todo button
    event.preventDefault(); //Stops page refresh
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  return (
    <div className="App">
      <h1>
        Todo List{" "}
        <span role="img" aria-label="run-emoji">
          🏃‍♂️
        </span>
      </h1>
      <form style={styles.form}>
        <FormControl>
          <InputLabel htmlFor="my-input">
            <span role="img" aria-label="check-emoji">
              ✅
            </span>{" "}
            Write a todo{" "}
          </InputLabel>
          <Input
            value={input}
            onChange={(event) => setinput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={handleAddTodo}
          variant="contained"
          color="primary"
          style={{ marginLeft: 10 }}
        >
          Add todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "normal",
  },
};

export default App;
