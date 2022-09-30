import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      console.log("Login 페이지");
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const signInWithEmailAndPasswordHandler = (event,email, password) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password).catch(err => {
    setError(err.message);
    });
  };
  
  const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
    
      if(name === 'userEmail') {
          setEmail(value);
      }
      else if(name === 'userPassword'){
        setPassword(value);
      }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">로그인</h1>
      <div className="mx-auto w-11/12 md:w-2/6 rounded py-20 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value = {email}
            placeholder="이메일 주소를 입력해주세요."
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value = {password}
            placeholder="비밀번호를 입력해주세요."
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            로그인
          </button>
        </form>
        <p className="text-center my-3"></p>
        <button
          className="bg-blue-500 hover:bg-blue-600 w-full py-2 text-white"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Sign in with Google
        </button>
        <p className="text-center my-3">
         {" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            회원 가입
          </Link>{" "}
          <br />{" "}
          <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
            비밀번호 찾기
          </Link>
        </p>
      </div>
    </div>
  );
}