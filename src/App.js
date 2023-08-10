import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
// import TodoList from './routes/TodoList'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route path='/todo-list' element={<TodoList />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
