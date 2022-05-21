import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './App.scss';

function App() {

  const navigate=useNavigate();

  const initialValues = { email: "", password: "" ,repassword:"",username:"",mobileno:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err=Object.keys(validate(formValues)).length;
    console.log(err);
    if(err===0)
    {
      navigate("/barchart");
    }
    else
    {
      setFormErrors(validate(formValues));
    } 
  };

  const validate = (values) => {
    const errors = {};
    // const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pass=/^(?=.*[a-zA-Z0-9]).{6,20}$/;

  
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    
    if (!values.password) {
      errors.password = "Password is required!";
    }
    else if (!pass.test(values.password)) {
      errors.password = "Please enter strong password!";
    } 
    else if (values.password.length < 4) {
      errors.password = "Password must be at least  4 characters long.";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters.";
    }

    if(!values.repassword)
    {
      errors.repassword = "Confirm Password is required!";
    }
    else if(values.repassword != values.password)
    {
      errors.repassword = "password does not match"
    }

    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.mobileno) {
      errors.mobileno = "Phone Number is required!";
    }
    else if(values.mobileno.length != 10)
    {
      errors.mobileno = "Phone number is must be 10"
    }

    return errors;
  };

  return (
  <>
  <div className='main'>
    <div className='main__left'>
      <h2 className='left__h2'>Choose a date range</h2>
      <p className="left__p">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/>Iste, provident aliquid!</p>
    </div>
    
    <div className='main__right'>
      <h1>Create an account</h1>
    <form onSubmit={handleSubmit}>

    <p className='right__p'>Your email address</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
            <br />
            <span className="right__p--span">{formErrors.email}</span>
    
    <p className='right__p'>Your Password</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <br />
            <span className="right__p--span">{formErrors.password}</span>
    
    <p className='right__p'>Confirm your Password</p>
            <input
              type="password"
              name="repassword"
              placeholder="re-enterPassword"
              value={formValues.repassword}
              onChange={handleChange}
            />
            <br />
            <span className="right__p--span">{formErrors.repassword}</span>

    <p className='right__p'>Your full name</p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
            <br />
            <span className="right__p--span">{formErrors.username}</span>

    <p className='right__p'>Your Phone number</p>
            <input
              type="number"
              name="mobileno"
              placeholder="Phone No."
              value={formValues.mobileno}
              onChange={handleChange}
              style={{width:'20%'}}
            />
            <br />
            <span className="right__p--span">{formErrors.mobileno}</span>
      <br /><br />

      <input type="checkbox" id='tandc' name='tandc' style={{width:'20px',height:'auto'}} required/>
        <b>I read and agree Terms and Condition</b><br />
      <button className='right__btn' type="submit">Creat account</button>
      </form>
    </div>
  </div>
      
  </>
  );
}

export default App;
