import {AllClients} from '../src/components/AllClient'
import { Client } from './components/Client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {
   
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllClients/>}></Route>
            <Route path="/client/:id" element={<Client/>}></Route>
            <Route path="/client/add" element={<Client/>}></Route>
          </Routes>
      </BrowserRouter>

      
   
    </div>
  );
}

export default App;


   {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> 
    
    import logo from './logo.svg';
import './App.css';*/}