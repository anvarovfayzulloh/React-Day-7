import React, { useEffect, useState } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import axios from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    axios.post("auth/login", { username, password })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          alert("Login successfully");
          navigate("/");
        }
      })
      .catch(error => {
        alert("Login failed");
      });
  };

  useEffect(() => {
    const generatedNumber = Math.floor(Math.random() * 10);
    setRandomNumber(generatedNumber);

    if (generatedNumber !== null) {
      axios(`/users/${generatedNumber}`)
        .then(response => setUser(response.data))
    }
  }, []);

  return (
    <section className='login'>
      <div className="container">
        <div className="login__wrapper">
          <h1>Login</h1>
          <form onSubmit={handleSubmitLogin} className='login__form'>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type='submit' className='login__btn'>Login</button>
          </form>
        </div>
        <div className="example__wrapper">
          <h2>Example User</h2>
          {
            user ? (
              <>
                <p>Username: {user.username}</p>
                <p>Password: {user.password}</p>
              </>
            ) : (
              <p>Loading example user...</p>
            )}
        </div>
      </div>
    </section>
  );
};

export default Login;
