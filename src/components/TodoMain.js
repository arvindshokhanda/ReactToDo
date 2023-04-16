import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import TodoList from "./TodoList";
import Modal from "react-bootstrap/Modal";

function TodoMain() {
  const [task, setTask] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [show, setShow] = useState(false);
  const [updateState, setUpdateState] = useState('');
  const [indexState, setIndexState] = useState('');

  const handleClose = () => setShow(false);
  
  //Intinal API calling for Rendering the TODO's
  const handleShow = (index) => {
    setIndexState(index);
    setShow(true);
    const val = taskArray[index];
    setUpdateState(val.title)
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setTaskArray(result);
      });
  }, []);

  const onTaskChange = (event) => {
    setTask(event.target.value);
  };
  const onUpdateStateChange = (event) => {
    setUpdateState(event.target.value);
  }

//API calling for Adding a TODO
  const addTask = async (e) => {
    e.preventDefault();

    if (task !== "") {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify({
            task,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const obj = { id: data.id, title: data.task };
      console.log(obj);
      setTaskArray((prevTasks) => {
        const updatedArray = [obj, ...prevTasks];
        return updatedArray;
      });
      setTask("");
    }
  };

//Dummy call for Deleting a TODO
  const handleDelete = (indexToBeDeleted) => {
    console.log(indexToBeDeleted);

    fetch(`https://jsonplaceholder.typicode.com/posts/${indexToBeDeleted}`, {
      method: "DELETE",
    });
    const newTasks = taskArray.filter(
      (_ele, index) => index !== indexToBeDeleted
    );
    setTaskArray(newTasks);
  };

  //Handling the Edit functionality
  const handleUpdate = async () => {
    console.log(indexState);
    const obj = taskArray.filter((val)=>val.id === indexState+1)
    console.log(obj);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${indexState+1}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: obj[0].id,
          title: updateState,
          completed: obj[0].completed,
          userId: obj[0].userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    setShow(false);
    const data = await response.json();
    taskArray.forEach((val)=>{
      if(val.id === obj[0].id){
        val.title = data.title
      }
    })
    console.log(data);
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="email"
                autoFocus
                value = {updateState}
                onChange = {onUpdateStateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="container">
        <h1>My Todo List</h1>
        <Form onSubmit={addTask}>
          <Form.Group className="mb-3" controlId="formBasicTodo">
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={task}
              onChange={onTaskChange}
              placeholder="Enter todo"
              required
            ></textarea>
          </Form.Group>
          <Button variant="primary" type="submit" size="md">
            Add
          </Button>
        </Form>
      </div>
      <hr />
      <TodoList
        todos={taskArray}
        handleDelete={handleDelete}
        handleShow={handleShow}
      />
    </>
  );
}
export default TodoMain;
