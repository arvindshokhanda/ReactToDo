import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiFillDelete,AiFillEdit } from "react-icons/ai";

import "../App.css";

const TodoList = (props) => {
   return (
      <ListGroup id="list_group">
         {props.todos.map((todo, index) => (
            <ListGroupItem key={index} id="flex-display">
               <div >{todo.id}</div>
               <div id="content">{todo.title}</div>
               <div id="deleteButton">
                  <AiFillDelete
                     onClick={() => props.handleDelete(index)}
                     size={35}
                  />
               </div>
               <div id="deleteButton">
                  <AiFillEdit
                     onClick={() => props.handleShow(index)}
                     size={35}
                  />
               </div>
            </ListGroupItem>
         ))}
      </ListGroup>
   );
};
// how can i include before pseudo element and the first element in div in react

export default TodoList;
