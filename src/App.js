import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://6e32-2406-5900-103c-d815-f572-5dff-7e00-d937.ngrok-free.app/home',
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        const data = response.data;
        setIsLogin(data.isLogin);
      })
      .catch((error) => {
        console.error('Error checking session:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {isLogin ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Login setIsLogin={setIsLogin} />} />
          )}
          <Route path="/join" element={<Join />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
