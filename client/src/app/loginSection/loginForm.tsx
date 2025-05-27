"use client"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm () {
      const [message, setMessage] = useState("");
      const router = useRouter();
      return (
            <div className="flex justify-center items-center px-[5%] flex-1 ">
              <Formik 
                    initialValues={ {  email : "", password : "" } }
                    onSubmit={ async ( v, { resetForm } ) => {
                        try {
                              const res = await axios.post( `http://localhost:3000/api/users/login`, v );
                               setMessage(res.data.msg);
                               const token = res.data.token;
                               localStorage.setItem("token", token);
                               if(token){ resetForm() }
                               setTimeout(() => { if( token ) { router.push("/") } }, 1000);
                        } catch (error) {
                                if (axios.isAxiosError(error)) {
                                   setMessage(error.response?.data?.msg);
                                } else {
                                  setMessage(" server aldaa ko ");
                                } 
                                setTimeout(() => setMessage(""), 3000);
                        }
                    }}
                    validationSchema={ Yup.object( {
                        email : Yup.string().email("Invalid email").required("Required"),
                        password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
                    })}
               >
                    { ( { handleSubmit } ) => (
                      <Form
                           onSubmit={handleSubmit}
                           className=" p-6 rounded w-full space-y-4"
                      >  
                           <button
                                 onClick={() => router.push("/loginSection")  }
                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                           >
                                  ← Back
                           </button>

                           <h2 className="text-2xl font-bold mb-6 text-center"> Log in </h2>

                           <div className="mt-4">
                               <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Имэйл </label>
                               <Field
                                   name="email"
                                   type="email"
                                   id="email"
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                               />
                              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                           </div>
                           <div className="mt-4">
                               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                 Нууц үг
                               </label>
                               <Field
                                 name="password"
                                 type="password"
                                 id="password"
                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                               />
                               <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                           </div>
                            <Link href="loginSection?forgotPassword=ok"  >
                                   <p className="hover:underline pb-[10px] " > forgot password ? </p>
                            </Link>
                            {message && (
                                 <div className="text-sm text-center text-green-600">{message}</div>
                            )}

                           <button
                                 type="submit"
                                 className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                           >
                              Let's go
                           </button>
                           <div className="text-sm text-center mt-4">
                                <span> dont have acc  ? </span>
                                <Link href="/loginSection" className="text-blue-600 hover:underline">
                                       sign up
                                </Link>
                           </div>

                      </Form>
                    ) }
              </Formik>
            </div>
      )
}