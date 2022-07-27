import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
