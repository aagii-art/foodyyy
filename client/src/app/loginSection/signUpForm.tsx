"use client"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react";
import * as Yup from "yup";

export default function SignUpForm () {
      const [message, setMessage] = useState("");
      return (
            <div className="flex justify-center items-center px-[5%] flex-1 ">
              <Formik 
                    initialValues={ { name  : "", email: "", password: "" } }
                    onSubmit={ async (v, { resetForm } ) => {
                        try {
                              const res = await axios.post( `http://localhost:3000/api/users`, v );
                               setMessage("Амжилттай бүртгэгдлээ!");
                               resetForm();
                        } catch (error : any ) {
                              setMessage(error.response?.data?.message || "Алдаа гарлаа");
                        }
                        
                    }}
                    validationSchema={ Yup.object( {
                        name : Yup.string().required(" enter name "),
                        email: Yup.string().email("Invalid email").required("Required"),
                        password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),

                    })}
               >
                    { ( { handleSubmit } ) => (
                      <Form
                           onSubmit={handleSubmit}
                            className=" p-6 rounded w-full space-y-4"
                      >    
                           <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                           <div  >
                            <label  className="block text-sm font-medium text-gray-700" > ner </label>
                            <Field
                                 name="name"
                                 type="text"
                                 id="name"
                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"

                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                           </div>

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
                            {message && (
                                 <div className="text-sm text-center text-green-600">{message}</div>
                           )}

                           <button
                                 type="submit"
                                 className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                           >
                              Sign Up
                           </button>

                      </Form>
                    ) }
              </Formik>
            </div>
      )
}