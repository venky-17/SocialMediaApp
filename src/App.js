
import './App.css';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom"
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Navbar from './Components/Navbar';
import AuthHome from './Components/AuthHome';
import PrivateRoute from "./Components/PrivateRoute"


function App() {
  return (
    <div className="App">

    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route
      path="/home"
      element={
        <PrivateRoute>
          <AuthHome />
        </PrivateRoute>
      }
    />
     
      </Routes>
    </Router>

    </div>
  );
}

export default App;
