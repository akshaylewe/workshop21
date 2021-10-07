import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginUser() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = async (e) => {
    const { username, password } = state;
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          username,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("UserInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
    console.log(username, password);
  };

  return (
    <>
      <center>
        <div className="card col-12 col-lg-4 mt-5">
          <h2>User Login</h2>
          <form>
            <div className="form-group text-left">
              <label htmlFor="username">username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Your username"
                value={state.username}
                onChange={handleChange}
              />
            </div>
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

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmitClick}
            >
              Login
            </button>
          </form>
          <p>
            Dont have an account <Link to={"/"}>Clickhere</Link>
          </p>
        </div>
      </center>
    </>
  );
}

export default LoginUser;
