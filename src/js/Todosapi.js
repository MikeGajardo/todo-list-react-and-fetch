import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Todosapi = (props) => {
  const [todo, setTodos] = useState([{ label: "a to-do item" }]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/MikeGajardo")
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.log(error);
        fetch("https://assets.breatheco.de/apis/fake/todos/user/MikeGajardo", {
          method: "POST",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
              return resp.json();
          })
          .then(data => {
              console.log(data);
          })
          .catch(error => {
              console.log(error);
          });
      });
  }, []);

  let addTodo = e => {
    if (e.keyCode == 13) {
      let todoText = e.target.value;
      let completeTodo = { label: todoText, done: false };
      let newTodos = [...todo, completeTodo];
      setTodos(newTodos);
      fetch("https://assets.breatheco.de/apis/fake/todos/user/MikeGajardo", {
        mehod: "PUT",
        body: JSON.stringify(newTodos),
        headers: {
          "Content-Type": "application/json",
        },
        })
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  let deleteTodo = i => {
    let clearTodo = todo.filter((the, index) => index !== i);
    setTodos(clearTodo);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/MikeGajardo", {
      mehod: "PUT",
      body: JSON.stringify(clearTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };


  let clearTodos = i => {
    setTodos([]);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/MikeGajardo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="todo-container">
        <div>
          <h1>Concert Set List</h1>
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
                <img onClick={() => deleteTodo(index)} src="https://media3.giphy.com/media/LNOZoHMI16ydtQ8bGG/giphy.gif" alt="Vinyl Spin"></img>
                <span>{the.label}</span>
                <img onClick={() => deleteTodo(index)} src="https://media3.giphy.com/media/LNOZoHMI16ydtQ8bGG/giphy.gif" alt="Vinyl Spin"></img>
              </div>
            ))}
          </form>
        <div>
                <button
						className="btn btn-danger m-4"
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
