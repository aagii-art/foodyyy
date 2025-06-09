import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";

interface Props {
    onClose : () => void;
    onFoodAdded : () => void;
    selectedCategory  : string;
    selectedCategoryName : string;
  }

const foodSchema = Yup.object().shape({
    name : Yup.string().required(" ner oruul "),
    price: Yup.number().typeError("Тоон утга оруулна уу").required("Үнэ оруулна уу"),
    image: Yup.mixed().required("Зураг оруулна уу")
          .test("fileType", "Зөвхөн зураг файл байж болно", (value ) => {
           return value instanceof File && value.type.startsWith("image/"); }),
    description : Yup.string().required(" tailbar oruul zaluu ")
})  

export default function AddFoodForm({ onFoodAdded, onClose, selectedCategory, selectedCategoryName }: Props ) {
         const [error, setError] = useState<string | null>(null);
         const [categories, setCategories] = useState<string[]>([]);
         const [message, setMessage] = useState<string | null>(null);

         useEffect(() => {
              const fetchCategories = async () => {
                try {
                  const res = await axios.get("http://localhost:3000/api/foods/categories");
                  const names = res.data.categories.map((cat: any) => cat.name);
                  console.log("categories :", names);
                  
                  setCategories(names);
                } catch (err) {
                  console.error("Error fetching categories", err);
                }
              };
             fetchCategories();
         }, []);
         
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4  border rounded mb-4 bg-white shadow">
            <h2 className="text-lg font-semibold mb-4">Хоол нэмэх : { selectedCategory ? selectedCategory : selectedCategoryName }  </h2>
            <Formik
                  initialValues={{ name: "", price : "" , image : null as File | null,  description: "" }}
                  validationSchema={foodSchema}
                  onSubmit={async (values , { resetForm }) => {
                          
                          const formData = new FormData();
                          formData.append("name", values.name);
                          formData.append("price", values.price.toString());
                          formData.append("category", selectedCategory ? selectedCategory : selectedCategoryName );
                          if (values.image) {
                             formData.append("jurag", values.image); 
                          }
                          formData.append("description", values.description);

                       try {
                           const res = await axios.post("http://localhost:3000/api/foods", formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          });
                          console.log("this is hariu foodForm's post huseltiin : ", res );
                          setError(null);
                          setMessage(res.data.message); 
                          resetForm();
                          setTimeout(() => {
                            onFoodAdded();
                          }, 3000); 
                       } catch (error : any ) {
                          setMessage(null);
                          if (error.response && error.response.data.message) {
                              setError(error.response.data.message);
                        } else {
                          setError(" foodForm submit hiih uyed aldaa garjeenaa");
                        }
                       }
                  }}
            >
            {({ values , setFieldValue }) => (
              <Form>
                   <div>
                     <label className="block">Нэр:</label>
                     <Field name="name" className="border p-2 w-full rounded" />
                     <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                   </div>
         
                   <div>
                     <label className="block">Тайлбар:</label>
                     <Field
                       name="description"
                       as ="textarea"
                       className="border p-2 w-full rounded"
                     />
                     <ErrorMessage
                       name="description"
                       component="div"
                       className="text-red-500 text-sm"
                     />
                   </div>

                   <div>
                     <label className="block">Үнэ:</label>
                     <Field name="price" type="number" className="border p-2 w-full rounded" />
                     <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                   </div>
         
                   <div>
                     <label className="block">  Picture  </label>
                     <input
                       type="file"
                       accept="image/*"
                       onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                           setFieldValue("image", file);
                         }
                       }}
                       className="border p-2 w-full rounded"
                     />
                     {values.image instanceof File && (
                       <img
                         src={URL.createObjectURL(values.image)}
                         className="w-32 mt-2 rounded"
                       />
                     )}  
                     <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                   </div>

                   {message && <div className="text-green-600 mt-2">{message}</div>}
                   {error && <div className="text-red-600 mt-2">{error}</div>}

                   <div className="flex gap-4">
                       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Нэмэх</button>
                       <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Болих</button>
                   </div>
              </Form>
            )}
            </Formik>
        </div>
    )
}

