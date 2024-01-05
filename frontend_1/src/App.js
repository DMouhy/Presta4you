import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/admin/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/123456789' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
