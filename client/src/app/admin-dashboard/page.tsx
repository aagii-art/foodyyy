"use client"
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import FoodMenu from "./food-menu";
import { useSearchParams } from "next/navigation";
interface TokenType {
    role  : string
}

export default function Admin () {
const [decoded, setDecoded] = useState<TokenType | null>(null);
const searchParams = useSearchParams();
const foodMenuActive = searchParams.get("food-menu") === "ok";
const ordersActive = searchParams.get("orders") === "ok";


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<TokenType>(token);
      setDecoded(decodedToken);
    }
  }, []);
  if (!decoded || decoded.role !== "admin") {
    return <p>Access denied</p>;
  }

    return (
        <div className="flex bg-blue-300 min-h-screen " >
            <div className=" flex flex-col  items-center flex-1 " >
                 <div className=" flex gap-[10px] bg-amber-100 " >
                      <img src="/kask.png" alt="" className=" w-[36px] h-[36px] " />
                      <div>
                           <p className=" text-[20px] font-semibold   " >Nom<span className=" " >Nom</span> </p>
                           <p className=" text-[#71717A] text-[12px] " >Swift delivery</p>
                      </div>
                 </div>

                <div className=" flex flex-col  " >
                     <Link href="/admin-dashboard/?food-menu=ok" className="  px-[20px] py-[5px] bg-gray-100 rounded-lg " > 
                           food menu
                     </Link>
                     <Link href="/admin-dashboard/?orders=ok" > 
                           orders
                     </Link>
                </div>
            </div>

            <div className=" bg-amber-100 w-[80%] " >
               { foodMenuActive && <FoodMenu/> }
            </div>
        </div>
    )
}