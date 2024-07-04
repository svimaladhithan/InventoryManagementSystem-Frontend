import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct, addProductFailure } from "../Redux/Slice/ProductSlice";
import { Button, Label, Select } from "flowbite-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../Components/FormikTextInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiurl = import.meta.env.VITE_API_URL;
  const validationSchema = Yup.object({
    name: Yup.string().required("Product Name is required"),
    price: Yup.number().required("Product Price is required"),
    quantity: Yup.number().required("Product Quantity is required"),
    category: Yup.string().required("Product Category is required"),
    description: Yup.string().required("Product Description is required"),
  });

  const initialValues = {
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${apiurl}/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          price: values.price,
          quantity: values.quantity,
          category: values.category,
          description: values.description,
        }),
      });
      console.log(handleSubmit);
      const data = await response.json();
      dispatch(addProduct(data.result));
      toast.success("Product created successfully");
      navigate("/dashboard");
    } catch (error) {
      dispatch(addProductFailure(error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <div className="font-bold dark:text-white text-4xl">
              <h1 className="text-center mt-5">Create Product</h1>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-3">
                    <div>
                      <Label value="Product Name" />
                      <FormikTextInput
                        name="name"
                        type="text"
                        placeholder="Enter the product name"
                      />
                    </div>
                    <div>
                      <Label value="Product Price" />
                      <FormikTextInput
                        name="price"
                        type="number"
                        placeholder="Enter the product price"
                      />
                    </div>
                    <div>
                      <Label value="Product Category" />
                      <Field
                        as={Select}
                        name="category"
                        id="category"
                        placeholder="Select a category"
                      >
                        <option value="">Select a category</option>
                        <option value="Lock">Lock</option>
                        <option value="Thermostat">Thermostat</option>
                        <option value="Monitoring">Monitoring</option>
                      </Field>
                    </div>
                    <div>
                      <Label value="Description" />
                      <FormikTextInput
                        name="description"
                        type="text"
                        placeholder="Enter the product description"
                      />
                    </div>
                    <div>
                      <Label value="Quantity" />
                      <FormikTextInput
                        name="quantity"
                        type="number"
                        placeholder="Enter the product quantity"
                      />
                    </div>
                    <Button
                      type="submit"
                      style={{ width: "10rem" }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Add Product"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
