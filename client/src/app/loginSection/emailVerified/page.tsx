"use client";

import { useRouter } from "next/navigation";

export default function EmailVerifiedPage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/loginSection?loginForm=ok");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Email Verified!</h1>
      <p className="text-lg text-gray-700 mb-6">Your email has been successfully verified.</p>
      <button
        onClick={handleLoginClick}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    </div>
  );
}
