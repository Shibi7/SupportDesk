import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { logoutEmp } from "../features/employee/empSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { emp } = useSelector((state) => state.employee);


  const onLogout = () => {
    if(user){
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    }
    if(emp){
      dispatch(logoutEmp());
      dispatch(reset());
      navigate("/emp/login");
    }    
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <ul>
          {emp ? (           
            <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
            </li>

            ):(
              <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
            )
          }
          </ul>
        )}
      </ul>
    </header>
  );
}

export default Header;
