import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Register() {
  // Simple separate states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Separate errors too
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  //handling
  function handleFirstNameChange(e) {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(validateFirstName(value));
  }

  function handleLastNameChange(e) {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(validateLastName(value));
  }

  function handleMobileChange(e) {
    const value = e.target.value;
    setMobile(value);
    setMobileError(validateMobile(value));
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  }

  // Simple validation
  function validateFirstName(value) {
    if (!value) return 'First name is required';
    if (value.length < 2) return 'Minimum 2 characters';
    if (!/^[A-Za-z]+$/.test(value)) return 'Only letters allowed';
    return '';
  }

  function validateLastName(value) {
    if (!value) return 'Last name is required';
    if (value.length < 2) return 'Minimum 2 characters';
    if (!/^[A-Za-z]+$/.test(value)) return 'Only letters allowed';
    return '';
  }

  function validateMobile(value) {
    if (!value) return 'Mobile number is required';
    if (!/^\d{10}$/.test(value)) return 'Enter valid 10-digit number';
    if (!/^[6-9]/.test(value)) return 'Must start with 6,7,8,9';
    return '';
  }

  function validateEmail(value) {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter valid email';
    return '';
  }

  function validatePassword(value) {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Minimum 6 characters';
    if (!/[A-Z]/.test(value)) return 'Need one uppercase letter';
    if (!/[0-9]/.test(value)) return 'Need one number';
    return '';
  }

  
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const fNameError = validateFirstName(firstName);
    const lNameError = validateLastName(lastName);
    const mobError = validateMobile(mobile);
    const mailError = validateEmail(email);
    const passError = validatePassword(password);
    
    setFirstNameError(fNameError);
    setLastNameError(lNameError);
    setMobileError(mobError);
    setEmailError(mailError);
    setPasswordError(passError);
    
    // If no errors, submit
    if (!fNameError && !lNameError && !mobError && !mailError && !passError) {
      setIsSubmitting(true);
      
      // Simple object to send to backend
      const userData = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        password: password
      };
      
      console.log('Sending to backend:', userData);

      try{
        const res = await axios.post("https://employee-management-system-3-ril3.onrender.com/api/register", userData);

        console.log(res.data);
        alert("Registration Successful");
        setFirstName(''); 
        setLastName('');
          setMobile('');
          setEmail(''); 
          setPassword('');
          setIsSubmitting(false);

        }catch(error){

        if(error.response){
          alert(error.response.data.message || "Email already in use. Please login");
        }else{
          alert("Something went wrong");
        }

        }
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-primary text-center mb-4">Create Account</h2> <hr /> <br />
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={`form-control ${firstNameError ? 'is-invalid' : ''}`}
                    value={firstName}
                    onChange={e=>handleFirstNameChange(e)}
                    placeholder="John"
                  />
                  {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
                </div>

                <div className="mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${lastNameError ? 'is-invalid' : ''}`}
                    value={lastName}
                    onChange={e=>handleLastNameChange(e)}
                    placeholder="Doe"
                  />
                  {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
                </div>

                <div className="mb-3">
                  <label>Mobile</label>
                  <input
                    type="tel"
                    className={`form-control ${mobileError ? 'is-invalid' : ''}`}
                    value={mobile}
                    onChange={e=>handleMobileChange(e)}
                    maxLength="10"
                    placeholder="9876543210"
                  />
                  {mobileError && <div className="invalid-feedback">{mobileError}</div>}
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={e=>handleEmailChange(e)}
                    placeholder="john@example.com"
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={e=>handlePasswordChange(e)}
                    placeholder="••••••"
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                  <small className="text-muted">Min 6 chars, 1 uppercase, 1 number</small>
                </div>

                <div className="text-center mt-3">
  <span>Already have an account? </span>
  <Link to="/login">Login</Link>
</div>

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;