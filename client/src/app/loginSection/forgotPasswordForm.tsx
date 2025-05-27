"use client"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
        
 export default function ForgotPasswordForm () {
      const [message, setMessage] = useState("");
      const router = useRouter();
      return (
            <div className="flex justify-center items-center px-[5%] flex-1 ">
              <Formik 
                    initialValues={ { email: ""} }
                    validationSchema={ Yup.object( {
                         email: Yup.string().email("Invalid email").required("Required"),
                    })}
                    onSubmit={ async (v, { resetForm } ) => {
                        try {
                              const res = await axios.post( `http://localhost:3000/api/users/forgot-password`, v );
                               resetForm();
                               router.push(`/loginSection?email=${v.email}`); 
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
                           className=" p-6 rounded w-full space-y-4 "
                      >    
                           <button
                                 onClick={() => router.push("/loginSection?loginForm=ok")  }
                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                           >
                                  ← Back
                           </button>

                           <h2 className="text-2xl font-bold "> Reset your password </h2>
                           <p className=" text-[#71717A] text-[16px] " > Enter your email to receive a password reset link. </p>
                           <div className="mt-4">
                               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Имэйл</label>
                               <Field
                                   name="email"
                                   type="email"
                                   id="email"
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                               />
                              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                           </div>
                            {message && (
                                 <div className="text-sm text-center text-green-600">{message}</div>
                            )}

                           <button
                                 type="submit"
                                 className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                           >
                              Send link
                           </button>

                      </Form>
                    ) }
              </Formik>
            </div>
      )
}