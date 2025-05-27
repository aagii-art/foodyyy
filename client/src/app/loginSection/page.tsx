"use client"
import { useSearchParams } from "next/navigation";
import SignUpForm from "./signUpForm";
import LoginForm from "./loginForm";
import ForgotPasswordForm from "./forgotPasswordForm";
import ResetPasswordForm from "./resetPassword";
import EmailSent from "./emailSent";
export default function Page () {
    const paramsName = useSearchParams();
    const showLogin = paramsName.get("loginForm") === "ok";
    const showForgotPassword = paramsName.get( "forgotPassword" ) === "ok";
    const showResetPasswordForm = paramsName.get("token");
    const showSentEmail = paramsName.get("email");
    return (
        <div className=" flex bg-gray-50 min-h-screen p-[20px] " >
             {showLogin && <LoginForm /> } 
             { !showForgotPassword && !showLogin && !showResetPasswordForm && !showSentEmail && <SignUpForm/> }
             { showForgotPassword &&  <ForgotPasswordForm/> }
             { showResetPasswordForm && <ResetPasswordForm/> }
             { showSentEmail && <EmailSent/> }
             <img src="redBoy.png" alt="" className=" w-[60%] object-cover rounded-lg " />
        </div>
    )
}