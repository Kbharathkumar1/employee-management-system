import { useState} from "react";
import { updateEmployee,addEmployee } from "../../api/employeeApi";


function EmployeeForm({ employee, onUpdate }) {
//1.2
const isEditMode =employee !== null;

const [name,setName] =useState(employee?.name || "");
const [department,setDepartment] =useState(employee?.department || "");
const [email,setEmail] =useState(employee?.email || "");
const [salary,setSalary] =useState(employee?.salary || "");


//1.4
async function handleUpdate(e){
e.preventDefault();  //Stops browser form refresh.
const confirmUpdate =
window.confirm(
"Are you sure you want to update the employee details?"
);


if(confirmUpdate){
const updatedEmployee = {
name:name,
department:department,
email:email,
salary:salary
};

try{

if(isEditMode){

 await updateEmployee(
   employee.id,
   updatedEmployee
 );

 alert("Employee updated successfully");

}
else{

 await addEmployee(updatedEmployee);

 alert("Employee added successfully");

}

onUpdate();

}
catch(error){
 console.error(error);
}

}

}



return(

<div className="card mt-4 p-4 shadow">

<h3>
{isEditMode ?
"Edit Employee"
:
"Add Employee"}
</h3>

<form onSubmit={handleUpdate}>


{
isEditMode && (

<div className="mb-3">
<label>ID</label>
<input
className="form-control"
value={employee.id}
readOnly
/>
</div>

)
}



<div className="mb-3">
<label>Name</label>
<input
className="form-control"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
</div>



<div className="mb-3">
<label>Department</label>
<input
className="form-control"
value={department}
onChange={(e)=>setDepartment(e.target.value)}
/>
</div>



<div className="mb-3">
<label>Email</label>
<input
className="form-control"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
</div>



<div className="mb-3">
<label>Salary</label>
<input
className="form-control"
value={salary}
onChange={(e)=>setSalary(e.target.value)}
/>
</div>



<button className="btn btn-primary">
{isEditMode ?
"Update Employee"
:
"Add Employee"}
</button>


</form>

</div>

);

}

export default EmployeeForm;