import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate=useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function validateEmail(value) {
    if (!value) return "Email required";
    return "";
  }

  function validatePassword(value) {
    if (!value) return "Password required";
    return "";
  }

  async function handleLogin(e) {
    e.preventDefault();


    const eErr = validateEmail(email);
    const pErr = validatePassword(password);

    setEmailError(eErr);
    setPasswordError(pErr);

    if (!eErr && !pErr) {

      const loginData = {
        email:email,
        password:password
      };

      console.log("Login request:", loginData);

      try{

 let res = await axios.post("http://localhost:9191/api/login",loginData);

 localStorage.setItem("role", res.data.role);

 alert(res.data.message);

 navigate("/employees");

}
catch(error){
   alert(error.response.data.message);
}

    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
        
        <h2 className="text-primary">Login</h2>

        <form onSubmit={handleLogin}>

          <input
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-danger"> {emailError && <p>{emailError}</p>} </div>

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-danger"> {passwordError && <p>{passwordError}</p>} </div>

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    
  );
}

export default Login;