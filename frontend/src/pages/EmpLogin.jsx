import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { loginEmp, reset } from "../features/employee/empSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Button } from "@mui/material";

function EmpLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emp, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.employee);

  useEffect(() => {
    if (isError) {
      toast.error("Wrong email or password");
    }

    // Redirect when logged in
    if (isSuccess || emp) {
      navigate("/emp/tickets");
    }

    dispatch(reset());
  }, [isError, isSuccess, emp, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const empData = {
      email,
      password,
    };

    dispatch(loginEmp(empData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
     <Button variant="outlined" sx={{background:'white',marginLeft: 'auto',display:'flex', justifyContent: 'flex-end',my:10,fontFamily:"sans-serif",fontStyle:"unset",fontWeight:"bold"}}>
      <Link to="/login" style={{color:"black"}} >
        Click here to User Login
      </Link>    
      </Button>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Admin login </p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EmpLogin;
