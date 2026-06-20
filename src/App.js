import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todo") || "[]");
    setTodos(storedTodos);
  }, []);

  const changeHandler = (e) => {
    const todoData = e.target.value;
    setInput(todoData);
  }

  const submitHandler = () => {
    if (input.trim() !== "") {
      const newTodos = [...todos, input];
      setTodos(newTodos);
      localStorage.setItem("todo", JSON.stringify(newTodos));
      setInput("");
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitHandler();
    }
  }

  const deleteHandler = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  }

  return (
    <div className="app-container">
      <h1><span>To-Do</span> List</h1>
      
      <div className="App">
        <input
          placeholder="What's on your mind?"
          value={input}
          onChange={changeHandler}
          onKeyDown={handleKeyPress}
          className="todo-input"
          autoFocus
        />
        <button onClick={submitHandler} className="todo-btn">Add</button>
      </div>

      <div className='todo-value'>
        {todos.length > 0 ? (
          todos.map((item, index) => (
            <div className='todo-label' key={index}>
              <span className='todo-text'>{item}</span>
              <button className='todo-del-btn' onClick={() => deleteHandler(index)}>Done</button>
            </div>
          ))
        ) : (
          <p className="no-todo">No tasks yet. Add something!</p>
        )}
      </div>
    </div>
  );
}

export default App;
