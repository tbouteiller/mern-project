import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <ul>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
