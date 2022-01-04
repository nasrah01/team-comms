import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import logo from '../assets/images/chat01.png';
import styled from "styled-components";

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
    <FormContainer>
      <FormWrapper>
        <FormHeader>
          <img src={logo} alt="business logo" height={210} width={300} />
          <h2>Team Chat</h2>
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
        </FormHeader>
        <FormContent>
          <form className="mt-8 space-y-6" onSubmit={formSubmit}>
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
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </FormContent>
      </FormWrapper>
    </FormContainer>
  );
}

export default Auth

const FormContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 5px solid blue;
  padding: 3rem;
`;
const FormHeader = styled.div`
  text-align: center;

  h2 {
    font-size: clamp(1.5rem, 2.5vw, 4rem);
    font-family: cursive;
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    color: #005fff;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const FormContent = styled.div`
  padding: 2rem 0;

  div {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.45rem;
    color: rgb(61, 79, 88);
    font-size: clamp(1rem, 1vw, 1.4rem);
    letter-spacing: 0.7px;
    line-height: 1.3;
  }

  input {
    padding: 0.55rem 0.4rem;
    border: 1px solid rgb(184, 196, 194);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: all 150ms ease-in-out 0s;
    width: 250px;
  }

  input::placeholder {
    color: #b1b1b1;
    width: 100%;
    font-weight: unset;
  }

  input:hover {
    border-color: #dcdddd;
  }

  input:focus,
  input:active {
    box-shadow: 0px 0px 0px 1.5px #005fff;
    border-color: #005fff;
  }
`;
