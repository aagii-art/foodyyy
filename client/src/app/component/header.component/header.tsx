import Link from "next/link";
const Header = () => {
    return (
        <div className=" bg-black flex items-center justify-between px-[40px] py-[60px] " >
            <div className=" flex gap-[10px] " >
                <img src="/kask.png" alt="" />
                <div>
                    <p className=" text-[20px] font-semibold text-white  " >Nom<span className=" text-[#EF4444] " >Nom</span> </p>
                    <p className=" text-[#F4F4F5] text-[12px] " >Swift delivery</p>
                </div>
            </div>
            <div className="flex gap-[20px]" >
                <Link href="/loginSection" >
                     <button className=" text-[14px] py-[6px] px-[12px] rounded-full flex items-center justify-center bg-[#F4F4F5] text-[#18181B] " >Sign up</button>
                </Link>
                <button className=" text-[14px] py-[6px] px-[12px] rounded-full flex items-center justify-center bg-[#EF4444] text-[white] " >Log in</button>
            </div>
        </div>
    )
}
export default Header;