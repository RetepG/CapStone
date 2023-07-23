import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [invalidCreds, setInvalidCreds] = useState(false);
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      setInvalidCreds(true); // Set invalidCreds to true when login fails
    } else {
      closeModal();
    }
  };

  const demo = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    await dispatch(login(email, password));
    closeModal(); // Close modal after demo login
    history.push("/");
  };

  return (
    <div className="login-form-modal">
      <h1>Log In</h1>
      {invalidCreds && <p className="error-message">Invalid Credentials. Please Try Again!</p>} {/* New error message */}
      <form onSubmit={handleSubmit}>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <div className="form-field">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Log In</button>
          <button onClick={demo}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
