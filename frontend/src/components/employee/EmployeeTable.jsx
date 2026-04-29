import { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee } from "../../api/employeeApi";
import EmployeeForm from "./EmployeeForm";

function EmployeeTable(){

  var role=localStorage.getItem("role");

  const isAdmin = role==="ADMIN";
const isUser = role==="USER";


const [employees,setEmployees] = useState([]);
const [editingEmployee,setEditingEmployee] = useState(null);
const [showAddForm,setShowAddForm] =useState(false);

//search
const [searchTerm,setSearchTerm] = useState("");
const [departmentFilter,setDepartmentFilter] = useState("");

const filteredEmployees = employees.filter((emp)=>{
const matchesSearch =
emp.name.toLowerCase().includes(
searchTerm.toLowerCase()
);

const matchesDepartment =
departmentFilter === "" ||
emp.department === departmentFilter;

return matchesSearch && matchesDepartment;

});

//
useEffect(()=>{
 async function fetchEmployees(){
   try{
      const response = await getAllEmployees();
      setEmployees(response.data);
      console.log(response.data);
   }
   catch(error){
      console.error(error);
   }
 }
 fetchEmployees();
}, []);

async function removeEmployee(id){
const confirmDelete =window.confirm("Are you sure you want to delete this employee?");
  if(confirmDelete){
    try{
      await deleteEmployee(id);
      const response = await getAllEmployees();
          setEmployees(response.data);
    }
    catch(error){
      console.error(error);
    }
  }
}

async function handleUpdatedEmployee(){
  console.log("entered callback")
  try{
    console.log("entered try block")
    const response = await getAllEmployees();
    console.log("called api")
        setEmployees(response.data);
        setEditingEmployee(null);//Only close popup after successful refresh.If update fails, form stays open.
  }
  catch(error){
    console.error(error);
  }
}


async function handleAddedEmployee(){
try{
 const response = await getAllEmployees();
 setEmployees(response.data);
 setShowAddForm(false);
}
catch(error){
 console.error(error);
}
}


return(

<div className="container mt-5">


<nav className="navbar navbar-dark bg-dark rounded px-4 mb-4">
  <h3 className="text-white m-0">--------Employee Management System (EMS) Admin Dashboard--------</h3>
</nav>

<div className="card shadow p-3 mb-4">
  <h4>Dashboard Overview</h4>
  <h5>Total Employees: {employees.length}</h5>
</div>

<div className="row mb-4">

  <div className="col-md-3">
    {isAdmin && <button className="btn btn-success w-100" onClick={()=>setShowAddForm(true)}>Add Employee</button>}
  </div>

  { showAddForm && ( <div className="position-fixed top-50 start-50 translate-middle bg-white p-1 shadow rounded" style={{ zIndex:1000, width:"500px" }} >
  <EmployeeForm employee={null} onUpdate={handleAddedEmployee} />   
  <button className="btn btn-secondary mt-3" onClick={()=>setShowAddForm(false)} > Cancel </button>
  </div>
  )}

  <div className="col-md-5">
    <input className="form-control" placeholder="Search by name" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
  </div>

  <div className="col-md-4">
    <select className="form-select" value={departmentFilter} onChange={(e)=>setDepartmentFilter(e.target.value)} >
      <option value="">All Departments</option>
      <option value="HR">HR</option>
      <option value="IT">IT</option>
      <option value="Finance">Finance</option>
      <option value="Support">Support</option>
      <option value="Admin">Admin</option>
      <option value="Development">Development</option>
      <option value="Sales">Sales</option>
    </select>
  </div>

</div>

<table className="table table-bordered table-hover shadow">
<thead className="table-dark">
<tr>
<th>ID</th>
<th>Name</th>
<th>Department</th>
<th>Email</th>
<th>Salary</th>
<th>Actions</th>
</tr>
</thead>

<tbody>{ filteredEmployees.map((emp)=>(
<tr key={emp.id}>
  <td>{emp.id}</td>
  <td>{emp.name}</td>
  <td>{emp.department}</td>
  <td>{emp.email}</td>
  <td>₹ {emp.salary}</td>

  <td>
    { isAdmin && (
    <>
    <button className="btn btn-warning btn-sm me-2" onClick={()=>setEditingEmployee(emp)}> Edit </button>

    <button className="btn btn-danger btn-sm" onClick={()=>removeEmployee(emp.id)} > Delete </button>
    </>
    )}

    {isUser && (
    <span className="text-muted">View Only</span>
    )}
  </td>
</tr>
))}
</tbody>
</table>

{  isAdmin && editingEmployee && ( <div className="position-fixed top-50 start-50 translate-middle bg-white p-1 shadow rounded" style={{ zIndex:1000, width:"500px" }}>
<EmployeeForm employee={editingEmployee} onUpdate={handleUpdatedEmployee} />
<button className="btn btn-secondary mt-3" onClick={()=>setEditingEmployee(null)} > Cancel </button>
</div>
)}





</div>
);
}
export default EmployeeTable;