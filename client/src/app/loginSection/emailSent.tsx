import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react";

export default function EmailSent () {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const EmailSent = searchParams.get("email");

    const [resendMessage, setResendMessage] = useState("");

     const handleResend = async () => {
          if (!EmailSent) return;
          try {
              const res = await axios.post("http://localhost:3000/api/users/forgot-password", {
                    email: EmailSent,
              });
              setResendMessage("✅ Reset link sent again!");
              setTimeout(() => setResendMessage(""), 3000);
           } catch (error) {
                   setResendMessage("Error resending email.");
                   setTimeout(() => setResendMessage(""), 3000);
           }
     };
    return (
        <div>
            <button
                    onClick={() => router.back()}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
             >
                    ← Back
            </button>
            <p className=" text-[24px] font-semibold " > Please verify Your Email </p>
            <p className=" text-[#71717A] " >We just sent an email to <span className=" text-[#18181B] text-[16px] " >  { EmailSent && EmailSent } </span>  Click the link in the email to verify your account.</p>
            <button
                  onClick={handleResend}
                  className="bg-[#18181B]  text-white px-4 py-2 rounded"
            >
                  Resend Email
            </button>
            {resendMessage && (
             <p className="text-sm text-green-600">{resendMessage}</p>
      )}
        </div>
    )
}