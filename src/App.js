import './App.css';
import Register from './component/Register';
import {Route,Routes,} from "react-router-dom";
import Home from './component/Home';

function App() {
  return (
    <Routes>
    <Route exact  path="/"  element={<Register/>} />
    <Route path="/home" element={<Home/>} />
    
      </Routes>
    
   
  );
}

export default App;
