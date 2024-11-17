import './App.css';
import EmployeeTable from './components/EmployeeTable';
import FormComponent from './components/FormComponent';
import Header from './components/Header';
import { BrowserRouter , Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
      
        <Routes>
          <Route path="/" element = {<FormComponent />} />
          <Route path="/employees" element = {<EmployeeTable src='db.json'/>} />
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
