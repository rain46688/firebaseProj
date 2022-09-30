import React, { useEffect } from "react";
import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate();
    useEffect(() => {
          console.log("로그인 후 페이지");
        });
        const SignOut = async () => {
            console.log("SignOut");
            await logout().then(() => {
                console.log("successful");
                navigate("/");
              }).catch((error) => {
                console.log("error : ",error);
              });
        }
        return (
          <div className="mt-8"> 
            <h1 className="text-3xl mb-2 text-center font-bold">로그인 후 페이지</h1>
            <div className="mx-auto w-11/12 md:w-2/6 rounded py-20 px-4 md:px-8">
              <button
                className="bg-blue-500 hover:bg-blue-600 w-full py-2 text-white"
                onClick={() => SignOut()}>
                로그아웃
              </button>
            </div>
          </div>
        );
}
