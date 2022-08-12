import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //@type FUNCTION: handleLogout
  //@desc Handles the functionality for when a user logs out
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <nav>
        <div>
          <Link to="/">Home</Link>
          {user && <Link to="/createworkout">Create Workout</Link>}
        </div>
        <div>
          <ul>
            {user ? (
              <>
                <p className="greet-user">Hi, {user && user.name}</p>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
