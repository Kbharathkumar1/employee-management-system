import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import EmployeePage from "../pages/EmployeePage";


function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path='/register' element={<Register/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path="/employees" element={ <ProtectedRoute allowedRoles={["ADMIN", "USER"]}> <EmployeePage /> </ProtectedRoute> } />

    </Routes>
  );
}

export default AppRoutes;