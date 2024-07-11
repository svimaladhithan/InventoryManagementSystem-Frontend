import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, Select } from "flowbite-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../Components/FormikTextInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateOrder, updateOrderFailure } from "../Redux/Slice/OrderSlice";

const UpdateOrder = () => {
    const { id } = useParams();
    const orders = useSelector((state) => state.orders.orders);
    const order = orders.find((ele) => ele.id === id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiurl = import.meta.env.VITE_API_URL;

    // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Vendor Name is required"),
    product: Yup.string().required("Product Name is required"),
    quantity: Yup.number().required("Product Quantity is required"),
    orderValue: Yup.string().required("Order Value is required"),
    orderedDate: Yup.string().required("Ordered Date is required"),
    deliveryStatus: Yup.string().required("Delivery Status is required"),
  });

  // Define initial form values based on selected product or defaults
  const initialValues = {
    name: order.name || "",
    product: order.product || "",
    quantity: order.quantity || "",
    orderValue: order.orderValue || "",
    orderedDate: order.orderedDate || "",
    deliveryStatus: order.deliveryStatus || "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${apiurl}/update-order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      dispatch(updateOrder(data.result));
      navigate("/orders");
      toast.info("Order updated successfully");
    } catch (error) {
      dispatch(updateOrderFailure(error.message));
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
              <h1 className="text-center mt-5">Update Order</h1>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-3">
                    <div>
                      <Label value="Vendor Name" />
                      <FormikTextInput
                        name="name"
                        type="text"
                        placeholder="Enter the vendor name"
                        disabled
                      />
                    </div>
                    <div>
                      <Label value="Product Name" />
                      <FormikTextInput
                        name="product"
                        type="text"
                        placeholder="Enter the product price"
                        disabled
                      />
                    </div>
                    <div>
                      <Label value="Product Quantity" />
                      <FormikTextInput
                        name="quantity"
                        type="number"
                        placeholder="Enter the Quantity"
                        disabled
                      />
                    </div>
                    <div>
                      <Label value="Order Value" />
                      <FormikTextInput
                        name="orderValue"
                        type="number"
                        placeholder="Enter the order value"
                        disabled
                      />
                    </div>
                    <div>
                      <Label value="Ordered Date" />
                      <FormikTextInput
                        name="orderedDate"
                        type="text"
                        placeholder="Enter the ordered date"
                        disabled
                      />
                    </div>
                    <div>
                      <Label value="Delivery Status" />
                      <FormikTextInput
                        name="deliveryStatus"
                        type="text"
                        placeholder="Enter the delivery status"
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

export default UpdateOrder;