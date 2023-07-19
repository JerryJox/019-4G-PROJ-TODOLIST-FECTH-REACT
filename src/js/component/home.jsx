import React, { useState, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(-1);

  // Función para obtener los datos del servidor y actualizar el estado de ToDos
  const fetchData = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jerryjox")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch a los datos del servidor cuando se renderiza el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para actualizar la base de datos con la lista actual de ToDos
  const updateDatabase = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jerryjox", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Función para añadir una nueva tarea
  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (index) => {
    const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
    setTodos(updatedTodos);
  };

  // Función para limpiar la lista completa
  const handleClearList = () => {
    setTodos([]);
  };

  return (
    <div className="container">
      <h1>todos</h1>
      <ul>
        <li className="add-tasks">
          <input
            type="text"
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddTask();
              }
            }}
            placeholder="What needs to be done?"
          />
        </li>
        {todos.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
            className="new-tasks"
          >
            {item}
            {hoverIndex === index && (
              <FontAwesomeIcon icon={faXmark} onClick={() => handleDeleteTask(index)} />
            )}
          </div>
        ))}
      </ul>
      {todos.length > 0 ? (
        <div className="number-tasks">{todos.length} item left</div>
      ) : (
        <div className="number-tasks">No tasks, add tasks </div>
      )}
      <div className="extrabox1"></div>
      <div className="extrabox2"></div>
      <button onClick={handleClearList}>Clear List</button>
    </div>
  );
};

export default Home;
