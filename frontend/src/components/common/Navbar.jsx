
import {employees} from '../employee/EmployeeTable'

export function Navbar() {
  return (
    <>
    <nav className="navbar navbar-dark bg-dark rounded px-4 mb-4">
<h3 className="text-white m-0">EMS Admin Dashboard</h3>
</nav>

<div className="card shadow p-3 mb-4">
<h4>Dashboard Overview</h4>
<h5>Total Employees: {employees.length}</h5>
</div>
    </>
  )
}
