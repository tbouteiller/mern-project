import { useState } from "react";

const Login = () => {
  //@type HOOK: useState
  //@desc Holds the form login date in an object.
  const [logInFormData, setLogInFormData] = useState({
    email: "",
    password: "",
  });

  //Destructure to get current state values from hook
  const { email, password } = logInFormData;

  //@type FUNCTION: handleSubmit
  //@desc Handles the functionality for when a user logs into the form.
  const handleSubmit = (e) => {
    e.preventDefault();

    //capture log in data from destructured useState hook variables
    const userLogInData = {
      email,
      password,
    };

    //Will dispatch the userLogInData later with redux
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
