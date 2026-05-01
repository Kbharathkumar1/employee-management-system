import EmployeeTable from "../components/employee/EmployeeTable";

function EmployeePage() {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div className="container mt-4">

      {/* 🔹 Welcome Section */}
      <div className="mb-4">
        <h2>Welcome, {role}</h2>
        <p className="text-muted">
          Manage your employee data efficiently.
        </p>
      </div>


      {/* 🔹 Table Section */}
      <EmployeeTable />

    </div>
  );
}

export default EmployeePage;