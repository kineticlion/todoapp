import React from "react";
import { List, ListItem, ListItemText, Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Todo.css";
import db from "./firebase";

const Todo = (props) => {
  return (
    <List>
      <ListItem style={styles.listItemStyle}>
        <ListItemText primary={props.todo.text} secondary="Dummy Deadline ⏰" />
        <DeleteForeverIcon
          fontSize="large"
          onClick={() => db.collection("todos").doc(props.todo.id).delete()}
        />
      </ListItem>
    </List>
  );
};

const styles = {
  listItemStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Todo;
