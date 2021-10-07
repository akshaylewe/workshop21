import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterUser() {
  const [state, setState] = useState({
    username: "",
    email: "",
    mobile_no: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setemailError] = useState(false);
  
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  
  
  const emailValidation = () => {
    if (!state.email.includes("@" || ".")) {
      setemailError("Please Enter Valid Email Id");
    } else {
    }
  };
  
  
  const phoneNumberValidation = () => {
    if (state.mobile_no.length !== 10) {
      setError("Mobile Number Should be 10 Digits ");
    } else {
    }
  };

  const handleSubmitClick = async (e) => {
    const { username, email, mobile_no, password, confirm_password } = state;
    e.preventDefault();
    phoneNumberValidation();
    emailValidation();
    if (state.password !== state.confirm_password) {
      setMessage("Passwords do not match");
    } else {
      try {
        // setLoading(true)
        const { data } = await axios.post("http://localhost:4000/register", {
          username,
          email,
          mobile_no,
          password,
          confirm_password,
        });
        // setLoading(false)
        localStorage.setItem("UserInfo", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    }

    console.log(state);
  };

  return (
    <>
      <center>
        <div className="card col-12 col-lg-4 login-card mt-5">
          <h2>User Registration</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Full Name"
                value={state.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="InputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter Your email"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            {emailError && (
              <p style={{ color: "red", textAlign: "left" }}>{emailError}</p>
            )}
            <div className="form-group text-left">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="mobile_no"
                placeholder="Mobile Number"
                value={state.mobile_no}
                onChange={handleChange}
              />
            </div>
            {error && (
              <p style={{ color: "red", textAlign: "left" }}>{error}</p>
            )}
            <div className="form-group text-left">
              <label htmlFor="InputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="InputPassword1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                placeholder="Confirm Password"
                value={state.confirm_password}
                onChange={handleChange}
              />
            </div>
            {message && (
              <p style={{ color: "red", textAlign: "left" }}>{message}</p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmitClick}
            >
              Register
            </button>
            <p>
              Already have an account <Link to={"/login"}>Clickhere</Link>
            </p>
          </form>
        </div>
      </center>
    </>
  );
}

export default RegisterUser;
