import { useState } from "react";

const Register = () => {
  //@type HOOK: useState
  //@desc Holds the form registration date in an object.
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Destructure to get current state values from hook
  const { name, email, password, confirmPassword } = registerFormData;

  //@type FUNCTION: handleSubmit
  //@desc Handles the functionality for when a user submits the form.
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //@type FUNCTION: handleChange
  //@desc Handles the functionality for when a user alters form input values.
  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
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
          <label htmlFor="confirmPassword">Comfirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </section>
    </>
  );
};

export default Register;
