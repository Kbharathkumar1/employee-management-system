import { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee } from "../../api/employeeApi";
import EmployeeForm from "./EmployeeForm";


function EmployeeTable(){

const [employees,setEmployees] = useState([]);
const [editingEmployee,setEditingEmployee] = useState(null);
const [showAddForm,setShowAddForm] =useState(false);

useEffect(()=>{
 async function fetchEmployees(){
   try{
      const response = await getAllEmployees();
      setEmployees(response.data);
   }
   catch(error){
      console.error(error);
   }
 }
 fetchEmployees();
}, []);


//-2.1
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
  try{
    const response = await getAllEmployees();
        setEmployees(response.data);
        setEditingEmployee(null);//Only close popup after successful refresh.If update fails, form stays open.
  }
  catch(error){
    console.error(error);
  }
}


async function handleAddedEmployee(){

try{

 const response =
 await getAllEmployees();

 setEmployees(response.data);

 setShowAddForm(false);

}
catch(error){
 console.error(error);
}

}



return(

<div className="container mt-5">

<h2 className="text-center mb-4">
Employee Management System
</h2>

<button
className="btn btn-success mb-3"
onClick={()=>setShowAddForm(true)}
>
Add Employee
</button>

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


<tbody>

{
employees.map((employee)=>(

<tr key={employee.id}>

<td>{employee.id}</td>
<td>{employee.name}</td>
<td>{employee.department}</td>
<td>{employee.email}</td>
<td>₹ {employee.salary}</td>

<td> 

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>setEditingEmployee(employee)} 
>
Edit
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>removeEmployee(employee.id)}  
>
Delete
</button>
</td>
</tr>
))
}

</tbody>

</table>



{
editingEmployee && (

<div
className="position-fixed top-50 start-50 translate-middle bg-white p-1 shadow rounded"
style={{
zIndex:1000,
width:"500px"
}}
>

<EmployeeForm
employee={editingEmployee}
onUpdate={handleUpdatedEmployee}
/>

<button
className="btn btn-secondary mt-3"
onClick={()=>setEditingEmployee(null)}
>
Cancel
</button>

</div>

)
}



{
showAddForm && (

<div
className="position-fixed top-50 start-50 translate-middle bg-white p-1 shadow rounded"
style={{
zIndex:1000,
width:"500px"
}}
>
<EmployeeForm
employee={null}
onUpdate={handleAddedEmployee}
/>
<button
className="btn btn-secondary mt-3"
onClick={()=>setShowAddForm(false)}
>
Cancel
</button>

</div>

)
}



</div>

);

}

export default EmployeeTable;