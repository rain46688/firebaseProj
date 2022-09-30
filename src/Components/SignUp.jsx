import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, registerWithEmailAndPassword } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const createUserWithEmailAndPasswordHandler = async (event, displayName, email, password) => {
    event.preventDefault();
    try{
      await registerWithEmailAndPassword(displayName, email, password);
    }
    catch(err){
      setError(err.message);
      return;
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
    navigate("/");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">회원가입</h1>
      <div className="mx-auto w-11/12 md:w-2/4 rounded py-20 px-4 md:px-8">
        {err !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {err}
          </div>
        )}
        <form className="">
          <label htmlFor="displayName" className="block">
            Name : 
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="이름을 입력해주세요."
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="이메일을 입력해주세요.(복구 이메일 사용)"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="비밀번호를 입력해주세요.(6자 이상)"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, displayName, email, password);
            }}
          >
            회원가입
          </button>
        </form>
        <p className="text-center my-3"></p>
        <button
          onClick={() => {
              signInWithGoogle();
          }}
          className="bg-blue-500 hover:bg-blue-600 w-full py-2 text-white"
        >
          Sign In with Google
        </button>
        <p className="text-center my-3">
          {" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
           로그인 하러가기!
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;