import SignUpForm from "./signUpForm";

export default function Page () {

    return (
        <div className=" flex bg-gray-50 min-h-screen p-[20px] " >
            <SignUpForm/>
            <img src="redBoy.png" alt="" className=" w-[60%] object-cover rounded-lg " />
        </div>
    )
}