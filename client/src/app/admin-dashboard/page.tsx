"use client"
import Link from "next/link";
import FoodMenu from "./food-menu";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface TokenType {
    role  : string
}

export default function Admin () {

  const searchParams = useSearchParams();
  const ordersActive = searchParams.get("orders") === "ok";
  const foodMenuActive = searchParams.get("food-menu") === "ok";
  const [decoded, setDecoded] = useState<TokenType | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<TokenType>(token);
      console.log(" decoded token : ", decodedToken);
      
      setDecoded(decodedToken);
    }
  }, []);
  
  if (!decoded || decoded.role !== "admin") {
    return <p>Access denied</p>;
  }

    return (
        <div className="flex min-h-[100vh]  " >
            <div className=" sticky top-[0%] h-[100vh] flex flex-col  items-center w-[20vw] " >
                 <div className=" flex gap-[10px] " >
                      <img src="/kask.png" alt="" className=" w-[36px] h-[36px] " />
                      <div>
                           <p className=" text-[20px] font-semibold   " >Nom<span className=" " >Nom</span> </p>
                           <p className=" text-[#71717A] text-[12px] " >Swift delivery</p>
                      </div>
                 </div>

                <div className=" flex flex-col gap-[20px] mt-[30px] " >
                     <Link href="/admin-dashboard?food-menu=ok" className={`  px-[20px] py-[5px]  rounded-full " ${ foodMenuActive ? " bg-[#18181B] text-white " : "" }  `} >
                           food menu
                     </Link>
                     <Link href="/admin-dashboard?orders=ok" 
                         className={`  px-[20px] py-[5px] rounded-full ${ ordersActive ? " bg-[#18181B] text-white " : "" } `}
                     > 
                           orders
                     </Link>
                </div>
            </div>

            <div className=" bg-amber-100 w-[80vw] " >
                { foodMenuActive && <FoodMenu/> }
            </div>
        </div>
    )
}