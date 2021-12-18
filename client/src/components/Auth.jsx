import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios'
import { FaSignInAlt } from 'react-icons/fa'

const initialState = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''

}

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(initialState);

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
            {isSignup ? "Already have an account?" : "Do not have an account?"}
            <span onClick={switchMode}>{isSignup ? "Sign In" : "Sign Up"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth
