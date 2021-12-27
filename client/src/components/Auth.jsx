import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios'

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: ''

}

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(initialState);

  const formSubmit = async (e) => {

    e.preventDefault();

    const {username, password, email, avatar} = form;

    const URL = 'http://localhost:5000/auth';

    const { data: {token, userId, hashedPassword, fullName} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username, fullName: form.fullName, password, email, avatar
    });

    cookies.set('token', token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if(isSignup) {
      cookies.set("email", email);
      cookies.set("hashedPassword", hashedPassword);
      cookies.set("avatar");
    }

    window.location.reload();
    
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  return (
    <div>
      <div>
        <p>{isSignup ? "Sign Up" : "Sign In"}</p>
        <form onSubmit={formSubmit}>
          {isSignup && (
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          {isSignup && (
            <div>
              <label htmlFor="avatar">Avatar</label>
              <input
                name="avatar"
                type="text"
                placeholder="Avatar URL"
                onChange={handleChange}
                required
              />
            </div>
          )}
          {isSignup && (
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          {isSignup && (
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div>
            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
          </div>
        </form>
        <div>
          <p>
            {isSignup ? "Already have an account?" : "New user?"}
            <span onClick={switchMode}>{isSignup ? "Sign In" : "Sign Up"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth
