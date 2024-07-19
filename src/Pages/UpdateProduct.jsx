import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateProduct,
  updateProductFailure,
} from "../Redux/Slice/ProductSlice";
import { Button, Label, Select } from "flowbite-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../Components/FormikTextInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const product = products.find((ele) => ele.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiurl = import.meta.env.VITE_API_URL;

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Product Name is required"),
    price: Yup.number().required("Product Price is required"),
    quantity: Yup.number().required("Product Quantity is required"),
    category: Yup.string().required("Product Category is required"),
    description: Yup.string().required("Product Description is required"),
  });

  // Define initial form values based on selected product or defaults
  const initialValues = {
    name: product.name || "",
    price: product.price || "",
    quantity: product.quantity || "",
    category: product.category || "",
    description: product.description || "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${apiurl}/update-product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      dispatch(updateProduct(data.result));
      navigate("/dashboard");
      toast.info("Product updated successfully");
    } catch (error) {
      dispatch(updateProductFailure(error.message));
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
              <h1 className="text-center mt-5">Update Product</h1>
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
                        <option value="Input Devices">Input Devices</option>
                        <option value="Display and Graphics">Display and Graphics</option>
                        <option value="Connectivity and Stroage">Connectivity and Storage</option>
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
                      {isSubmitting ? "Updating..." : "Update"}
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

export default UpdateProduct;
