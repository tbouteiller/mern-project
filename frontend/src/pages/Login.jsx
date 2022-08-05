import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reset, login } from "../features/auth/authSlice";
import authService from "../features/auth/authService";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //@type HOOK: useState
  //@desc Holds the form login date in an object.
  const [logInFormData, setLogInFormData] = useState({
    email: "",
    password: "",
  });

  //Destructure to get current state values from hook
  const { email, password } = logInFormData;

  //Bring in state from store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //@type HOOK: useEffect
  //@desc Handles side effects and rerenders when state changes
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //@type FUNCTION: handleSubmit
  //@desc Handles the functionality for when a user logs into the form.
  const handleSubmit = (e) => {
    e.preventDefault();

    //capture log in data from destructured useState hook variables
    const userLogInData = {
      email,
      password,
    };

    dispatch(login(userLogInData));
  };

  //@type FUNCTION: handleChange
  //@desc Handles the functionality for when a user alters form input values.
  const handleChange = (e) => {
    setLogInFormData({
      ...logInFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log in</button>
        </form>
      </section>
    </>
  );
};

export default Login;
