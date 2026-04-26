import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Register from './pages/RegisterPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/LoginPage';
import EmployeeTable from './components/employee/EmployeeTable';

function App() {

  return (
    <>
      <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='employees' element={ <EmployeeTable/> } ></Route>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
