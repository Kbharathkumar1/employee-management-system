import { useState } from "react";
import { updateEmployee, addEmployee } from "../../api/employeeApi";

function EmployeeForm({ employee, onUpdate }) {

const isEditMode = employee !== null;

const [name,setName] = useState(employee?.name || "");
const [department,setDepartment] = useState(employee?.department || "");
const [email,setEmail] = useState(employee?.email || "");
const [salary,setSalary] = useState(employee?.salary || "");

const [errors,setErrors] = useState({});


function validateForm(){

    let newErrors={};

    if(!name.trim()){
    newErrors.name="Name is required";
    }

    if(!department.trim()){
    newErrors.department="Department is required";
    }

    if(!email.trim()){
    newErrors.email="Email is required";
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
    newErrors.email="Invalid email format";
    }

    if(!salary){
    newErrors.salary="Salary is required";
    }
    else if(isNaN(salary) || Number(salary)<=0){
    newErrors.salary="Salary must be positive";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length===0;

}



async function handleUpdate(e){
e.preventDefault();
if(!validateForm()){
return;
}

const confirmUpdate= window.confirm( isEditMode ? "Are you sure you want to update the employee details?" : "Are you sure you want to add employee?" );

if(confirmUpdate){

    const updatedEmployee={
    name:name,
    department:department,
    email:email,
    salary:salary
    };

        try{

        if(isEditMode){

        await updateEmployee(employee.id,updatedEmployee);

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
{isEditMode ? "Edit Employee" : "Add Employee"} </h3>
<form onSubmit={handleUpdate}>
{
isEditMode && (
<div className="mb-3">
<label>ID</label>
<input className="form-control" value={employee.id} readOnly />
</div>)
}



<div className="mb-3">
<label>Name</label>
<input className="form-control" value={name} onChange={(e)=>{ setName(e.target.value); setErrors({ ...errors,name:"" });}} />
{
errors.name && <small className="text-danger">{errors.name}</small>
}
</div>

<div className="mb-3">
<label>Department</label>
<input className="form-control" value={department} onChange={(e)=>{ setDepartment(e.target.value); setErrors({ ...errors,department:"" });}} />
{
errors.department && <small className="text-danger">{errors.department}</small>
}
</div>


<div className="mb-3">
<label>Email</label>
<input className="form-control" value={email} onChange={(e)=>{ setEmail(e.target.value); setErrors({ ...errors,email:"" });}} />
{
errors.email && <small className="text-danger">{errors.email}</small>
}
</div>


<div className="mb-3">
<label>Salary</label>
<input className="form-control" value={salary} onChange={(e)=>{ setSalary(e.target.value); setErrors({ ...errors,salary:"" });}} />
{
errors.salary && <small className="text-danger">{errors.salary}</small>
}
</div>

<button className="btn btn-primary">
{isEditMode ? "Update Employee" : "Add Employee"} </button>
</form>
</div>

);
}

export default EmployeeForm;