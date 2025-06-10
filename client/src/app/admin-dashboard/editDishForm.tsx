"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

interface FoodType {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface Props {
  food: FoodType;
  onClose: () => void;
  onUpdate: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number().required("Price is required").min(1, "Price must be at least 1"),
  description: Yup.string().required("Description is required"),
});

export default function EditDishForm({ food, onClose, onUpdate }: Props) {
const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (values: FoodType) => {
    try {       

        const res = await axios.put(`http://localhost:3000/api/foods/${food._id}`, values);
         console.log(res);
        setErrorMessage("");
        setSuccessMessage(res.data.messaage);
        onUpdate();
        onClose();
    } catch (err : any ) {
      console.error("Update failed", err);
        setSuccessMessage("");
        setErrorMessage(err.response.data.message);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this dish?")) {
      try {
        const res = await axios.delete(`http://localhost:3000/api/foods/${food._id}`);
        setErrorMessage("");
        setSuccessMessage(res.data.messaage);
        onUpdate();
        onClose();
      } catch (err : any ) {
        console.error("Delete failed", err);
        setSuccessMessage("");
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px]">
        <h2 className="text-lg font-bold mb-4">Edit Dish</h2>

        <Formik
          initialValues={food}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label>Name</label>
              <Field name="name" className="border p-2 w-full" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>Price</label>
              <Field name="price" type="number" className="border p-2 w-full" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>Description</label>
              <Field name="description" as="textarea" className="border p-2 w-full" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>
               {successMessage && (
                  <div className="text-green-600 text-sm">{successMessage}</div>
               )}
               {errorMessage && (
                  <div className="text-red-600 text-sm">{errorMessage}</div>
               )}
            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
              <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
