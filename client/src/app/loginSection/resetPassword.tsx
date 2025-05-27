"use client"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export default function ResetPasswordForm () {
      const [message, setMessage] = useState("");
      const searchParams = useSearchParams();
      const token = searchParams.get("token");
      const router = useRouter();
      return (
            <div className="flex justify-center items-center px-[5%] flex-1 ">
              <Formik 
                    initialValues={ { confirmPassword : "", newPassword: "" } }
                    validationSchema={ Yup.object( {
                        newPassword : Yup.string().min(6 , "Must be at least 6 characters" ).required("Required"),
                        confirmPassword : Yup.string().oneOf( [Yup.ref("newPassword")], " dont match fuck you " ).required("Давтан нууц үг шаардлагатай")
                    })}
                    onSubmit={ async (v, { resetForm } ) => {
                        try {
                              const res = await axios.post( `http://localhost:3000/api/users/reset-password`, { ...v, token });
                              setMessage(res.data.message);
                              resetForm();
                              router.push("/loginSection?loginForm=ok")
                        } catch (error) {
                                if (axios.isAxiosError(error)) {
                                   setMessage(error.response?.data?.message);
                                } else {
                                  setMessage(" server aldaa ko ");
                                } 
                                setTimeout(() => setMessage(""), 3000);
                        }
                              
                    }}
               >
                    { ( { handleSubmit } ) => (
                      <Form
                           onSubmit={handleSubmit}
                           className=" p-6 rounded w-full space-y-4"
                       >    
                           <button
                                 onClick={() => router.push("/loginSection?forgotPassword=ok")  }
                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                           >
                                  ← Back
                           </button>

                           <h2 className="text-2xl font-bold mb-6 text-center"> reset password </h2>
                           <div className="mt-4">
                             <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                               Шинэ нууц үг
                             </label>
                             <Field
                               name="newPassword"
                               type="password"
                               id="newPassword"
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                             />
                             <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                           </div>
                           
                           <div className="mt-4">
                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                               Нууц үг баталгаажуулах
                             </label>
                             <Field
                               name="confirmPassword"
                               type="password"
                               id="confirmPassword"
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                             />
                             <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                           </div>

                            {message && (
                                 <div className="text-sm text-center text-green-600">{message}</div>
                            )}

                           <button
                                 type="submit"
                                 className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                           >
                              password update
                           </button>

                      </Form>
                    )}
              </Formik>
            </div>
      )
}