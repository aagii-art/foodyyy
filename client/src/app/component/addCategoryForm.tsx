"use client"
import axios, { AxiosError } from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react";
import * as Yup from "yup"

interface Props {
  onCategoryAdded: () => void;
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required").min(2, "At least 2 characters"),
});

export default function AddCategoryForm({ onCategoryAdded, onClose }: Props) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h3 className="text-lg font-semibold mb-2">Add New Category</h3>

      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res =  await axios.post("http://localhost:3000/api/foods/categories", values);
            setSuccessMessage(res.data.message)
            resetForm();
            // onCategoryAdded();
          } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            console.error("Error adding category:", error);
            setErrorMessage(axiosError.response?.data?.message || "Failed to add category. Please try again." ); 
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-2">
              <Field
                name="name"
                type="text"
                placeholder="Enter category name"
                className="border p-2 w-full"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
            </div>
             {successMessage && (
                <div className="text-green-600 mb-2">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="text-red-600 mb-2">{errorMessage}</div>
              )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                {isSubmitting ? "Adding..." : "Add"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
