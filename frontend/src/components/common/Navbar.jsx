import { Link,useNavigate } from "react-router-dom";

function Navbar() {
  const navigate=useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  //in future, if i want to add role-based navbar like--> home,Employees,users,........login
          // const role = user?.role?.toUpperCase();
          // const isAdmin = role === "ADMIN";
          // const isUser = role === "USER";
  //

  function handleLogout() {
  localStorage.removeItem("user");
  navigate("/login");
}


  return (
    <nav className="navbar navbar-dark bg-dark px-4 mb-4">

      <h3 className="text-white m-0">EMS</h3>

      <div>

  <Link to="/" className="text-white me-3">Home</Link>

  {!isLoggedIn && (
    <>
      <Link to="/login" className="text-white me-3">Login</Link>
      <Link to="/register" className="text-white me-3">Register</Link>
    </>
  )}

  {isLoggedIn && (
    <>
      <Link to="/employees" className="text-white me-3">Employees</Link>

      <button onClick={handleLogout} className="btn btn-sm btn-light">
        Logout
      </button>
    </>
  )}

</div>

    </nav>
  );
}

export default Navbar;