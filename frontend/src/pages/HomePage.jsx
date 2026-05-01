import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mt-5">

      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Employee Management System</h1>
        <p className="lead text-muted">
          Manage employees, roles and operations efficiently.
        </p>

        <div className="mt-4">
          <Link to="/login">
            <button className="btn btn-primary me-3 px-4">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-outline-primary px-4">Register</button>
          </Link>
        </div>
      </div>


      {/* Features Section */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Features</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Employee Management</h5>
              <p>Add, update and manage employee records.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Role Based Access</h5>
              <p>Separate administrator and employee access.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Search and Validation</h5>
              <p>Filter data and validate forms properly.</p>
            </div>
          </div>
        </div>
      </div>


      {/* Roles Section */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Roles and Access</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="card border-primary shadow-sm p-3">
              <h5 className="text-primary">Administrator Access</h5>
              <p>Add, edit, delete and manage users.</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-success shadow-sm p-3">
              <h5 className="text-success">Employee Access</h5>
              <p>Access allowed features based on permissions.</p>
            </div>
          </div>
        </div>
      </div>


      {/* Tech Stack */}
      <div className="text-center">
        <h2 className="mb-3">Built With</h2>
        <p className="text-muted">
          React | Spring Boot | MySQL | Spring Security
        </p>
      </div>

    </div>
  );
}

export default HomePage;