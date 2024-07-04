import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVendor, addVendorFailure } from "../Redux/Slice/VendorSlice";
import { Button, Label } from "flowbite-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../Components/FormikTextInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateVendor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiurl = import.meta.env.VITE_API_URL;
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
    gst: "",
    product: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vendor Name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Vendor address is required"),
    gst: Yup.string().required("GST No is required"),
    product: Yup.string().required("Products are required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${apiurl}/create-vendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          gst_no: values.gst,
          products: values.product.split(",").map((product) => product.trim()),
        }),
      });
      const data = await response.json();
      dispatch(addVendor(data.data));
      toast.success("New vendor added successfully");
      navigate("/vendors");
    } catch (error) {
      dispatch(addVendorFailure(error.message));
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
              <h1 className="text-center mt-5">New Vendor</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-3">
                    <div>
                      <Label value="Vendor Name" />
                      <FormikTextInput
                        name="name"
                        type="text"
                        placeholder="Enter the Vendor name"
                      />
                    </div>
                    <div>
                      <Label value="Email ID" />
                      <FormikTextInput
                        name="email"
                        type="email"
                        placeholder="Enter the email address"
                      />
                    </div>
                    <div>
                      <Label value="Phone number" />
                      <FormikTextInput
                        name="phone"
                        type="text"
                        placeholder="Enter the phone number"
                      />
                    </div>
                    <div>
                      <Label value="Vendor address" />
                      <FormikTextInput
                        name="address"
                        type="text"
                        placeholder="Enter vendor address"
                      />
                    </div>
                    <div>
                      <Label value="GST No" />
                      <FormikTextInput
                        name="gst"
                        type="text"
                        placeholder="Enter the Gst Number"
                      />
                    </div>
                    <div>
                      <Label value="Products" />
                      <FormikTextInput
                        name="product"
                        type="text"
                        placeholder="Enter the products separated by commas"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ width: "10rem" }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500"
                    >
                      {isSubmitting ? "Submitting..." : "Add Vendor"}
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

export default CreateVendor;
