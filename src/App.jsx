import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const todoRef = useRef();

  const [storedTodos, setStoredTodos] = useState([]);

  useEffect(() => {
    const retrievedTodos = localStorage.getItem('todos');
    if (retrievedTodos) {
      setStoredTodos(JSON.parse(retrievedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(storedTodos));
  }, [storedTodos]);

  function handleSubmit(e) {
    e.preventDefault();
    if (todoRef.current.value) {
      setStoredTodos([...storedTodos, {
        id: Date.now(),
        text: todoRef.current.value
      }]);
      dispatch({
        type: 'ADD_TODO',
        id: Date.now(),
        text: todoRef.current.value
      });
      todoRef.current.value = '';
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>My Todos</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input ref={todoRef} type="text" />
        <button>ADD</button>
      </form>
      <ul className='todo-list'>
        {storedTodos.length > 0 && storedTodos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <button onClick={() => {
              dispatch({ type: 'DELETE_TODO', id: todo.id });
              setStoredTodos(storedTodos.filter(item => item.id !== todo.id));
            }}>
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
