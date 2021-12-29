import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import logo from '../assets/images/chat01.png';

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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="business logo" />
          <p className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Team Chat
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignup ? "Sign Up" : "Sign In"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignup && (
              <div>
                <label className="sr-only" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>
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
