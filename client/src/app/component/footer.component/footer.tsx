const Footer = () => {
    return (
        <div className=" bg-black pt-[50px] " >
              <div className="overflow-hidden whitespace-nowrap bg-[#EF4444] pl-[80px] py-[20px] flex gap-[50px]">
                   {Array(20).fill("Fresh fast delivered").map((text, i) => (
                        <p key={i} className="text-[#FAFAFA] text-[30px] font-semibold">
                           {text}
                        </p>
                    ))}
              </div>

              <div className=" flex justify-between ml-[5%] mt-[5%] mr-[15%] " >
                   <div>
                       <img src="kask.png" alt="" />
                       <div className=" mt-[10px] " >
                           <p className=" text-[20px] font-semibold text-white  " >Nom<span className=" text-[#EF4444] " >Nom</span> </p>
                           <p className=" text-[#F4F4F5] text-[12px] " >Swift delivery</p>
                       </div>
                   </div>
                   <div className=" flex flex-col gap-[15px] " >
                       <p className="text-[#71717A] text-[16px] " >NOMNOM </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Home </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Contact us </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Delivery zone </p>
                   </div>
                   <div  className=" flex flex-col gap-[15px] ">
                       <p className="text-[#71717A] text-[16px] " >MENU </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Appetizers  </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Salads </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Pizzas  </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Main dishes </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Desserts </p>

                   </div>
                   <div className=" flex flex-col gap-[15px]" >
                       <p className="text-black text-[16px]  " > you never see hha </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Side dish </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Brunch </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Desserts </p>
                       <p className="text-[#FAFAFA] text-[16px] " > Beverages</p>
                       <p className="text-[#FAFAFA] text-[16px] " > Fish & Sea foods </p>

                   </div>
                   <div>
                       <p className="text-[#71717A] text-[16px] " >FOLLOW US </p>
                        <div className="flex gap-[10px] mt-[15px]" >
                            <img src="Facebook.png" alt="" />
                            <img src="ig.png" alt="" />
                        </div>
                   </div>
              </div>

              <div className=" flex gap-[40px] border border-t-[rgba(244,244,245,0.4)] mx-[5%] mt-[5%] pt-[2%] pb-[10%] " >
                <p className=" text-[#71717A] text-[14px] " > Copyright 2026 © Xgold LLC  </p>
                <p className=" text-[#71717A] text-[14px] " > Privacy policy    </p>
                <p className=" text-[#71717A] text-[14px] " > Terms and conditoin  </p>
                <p className=" text-[#71717A] text-[14px] " > Cookie policy  </p>
              </div>
        </div>

    )
}
export default Footer;