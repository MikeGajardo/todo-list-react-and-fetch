import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Todosapi = (props) => {
  let D = "https://assets.breatheco.de/apis/fake/todos/user/MikeGajardo";
  const [todo, setTodos] = useState([{ label: "a to-do item" }]);

  let addTodo = (e) => {
    if (e.keyCode == 13) {
      let todoText = e.target.value;
      let todoTextComplete = todoText.charAt(0).toUpperCase();
      let completeTodo = { label: todoTextComplete, done: false };
      let newTodos = [...todo, completeTodo];
      setTodos(newTodos);

      fetch(D, {
        mehod: "PUT",
        body: JSON.stringify(newTodos),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let deleteTodo = (i) => {
    let clearTodo = task.filter((the, index) => index !== i);
    setTodos(clearTodo);
    fetch(D, {
      mehod: "PUT",
      body: JSON.stringify(clearTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(D)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
        fetch(D, {
          method: "POST",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  let clearTodos = (i) => {
    setTodos([]);
    fetch(D, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="todo-container">
        <div>
          <h1>To-Do's</h1>
          <div>
            <input
              type="text"
              className="input"
              onKeyDown={addTodo}
              placeholder="What song is next?"
            />
          </div>
          <form>
            {todo.map((the, index) => (
              <div key={index} className="todo-text">
                <img
                  onClick={() => deleteTodo(index)}
                  src="https://boryokudragonz.io/home/boku.gif"
                  alt="Green Beer"
                ></img>
                <span>{the.label}</span>
                <img
                  onClick={() => deleteTodo(index)}
                  src="https://boryokudragonz.io/home/boku.gif"
                  alt="Green Beer"
                ></img>
              </div>
            ))}
          </form>
        <div>
                <button
						className="btn btn-danger col "
						onClick={() => clearTodos()}>
						Delete Set List
				</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Todosapi;
