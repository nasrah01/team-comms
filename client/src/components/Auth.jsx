import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import background from '../assets/images/background.jpg';
import styled from "styled-components";
import { useForm } from "react-hook-form";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatarURL: "",
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(initialState);
  const { register, handleSubmit,  formState: { errors } } = useForm();

  const formSubmit = async (e) => {

    e.preventDefault();

    const { username, password, email, avatarURL } = form;

    const URL = 'http://localhost:5000/auth';

    try {
      const {
        data: { token, userId, hashedPassword, fullName },
      } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
        username,
        fullName: form.fullName,
        password,
        email,
        avatarURL,
      });

      cookies.set("token", token);
      cookies.set("username", username);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);

      if (isSignup) {
        cookies.set("email", email);
        cookies.set("hashedPassword", hashedPassword);
        cookies.set("avatarURL", avatarURL);
      }

      window.location.reload();
      
    } catch (error) {
      console.log(error.message)
    }

    
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
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
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
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FormWrapper = styled.div`
  height: 100vh;
  width: 40%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rem;
  box-shadow: 0px 1px 5px rgb(0, 0, 0, .3);
  border-radius: 5px;
  transition: 0.8s ease;
`;

const FormHeader = styled.div`
  text-align: center;
  padding: 0 5rem 3rem 5rem;
  border-bottom: 2px solid #ebebeb;
  width: 100%;

  h2 {
    font-size: clamp(1.5rem, 2.5vw, 4rem);
    font-family: cursive;
    padding-bottom: .5rem;
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
  width: 90%;

  div {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: 0.45rem;
    color: rgb(61, 79, 88);
    font-size: clamp(1rem, 1vw, 1.2rem);
    text-transform: uppercase;
    font-weight: 700;
  }

  input {
    padding: 1rem 0.4rem;
    box-shadow: 0px 4px 12px 0px rgba(79, 114, 205, 0.3);
    border: 1px solid rgb(184, 196, 194);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: all 150ms ease-in-out 0s;
  }

  input::placeholder {
    padding-left: 0.5rem;
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
    border-color: rgb(0, 95, 255);
  }

  button {
    border-radius: 4px;
    background: #005fff;
    border: 1px solid #005fff;
    color: #fff;
    font-weight: 500;
    padding: 0.7rem 1.2rem;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    background: #023c92;
  }

  span {
    cursor: pointer;
    color: #005fff;
    padding-left: 0.5rem;
  }

  p {
    font-size: clamp(1rem, 1vw, 1.4rem);
    text-align: center;
  }
`;
