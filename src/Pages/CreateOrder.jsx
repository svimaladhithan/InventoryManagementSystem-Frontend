import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Label, Select } from "flowbite-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../Components/FormikTextInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addOrder, addOrderFailure } from "../Redux/Slice/OrderSlice";

const CreateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiurl = import.meta.env.VITE_API_URL;
  const validationSchema = Yup.object({
    name: Yup.string().required("Vendor Name is required"),
    product: Yup.string().required("Product Name is required"),
    quantity: Yup.number().required("Product Quantity is required"),
    orderValue: Yup.number().required("Order Value is required"),
    orderedDate: Yup.string().required("Order Date is required"),
    deliveryStatus: Yup.string().required("Delivery Status is required"),
  });

  const initialValues = {
    name: "",
    product: "",
    quantity: "",
    orderValue: "",
    orderedDate: "",
    deliveryStatus: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${apiurl}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify({
          name: values.name,
          product: values.product,
          quantity: values.quantity,
          orderValue: values.orderValue,
          orderedDate: values.orderedDate,
          deliveryStatus: values.deliveryStatus,
        }),
      });
      const data = await response.json();
      //   console.log("order",response);
      dispatch(addOrder(data.data));
      toast.success("Order created successfully");
      navigate("/orders");
    } catch (error) {
      dispatch(addOrderFailure(error.message));
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
              <h1 className="text-center mt-5">My Orders</h1>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-3">
                    <div>
                      <Label value="Vendor Name" />
                      <Field
                        as={Select}
                        name="name"
                        id="name"
                        placeholder="Select the Vendor"
                      >
                        <option value="">Select the Vendor</option>
                        <option value="August Smart Lock">
                          August Smart Lock
                        </option>
                        <option value="Honeywell">Honeywell</option>
                        <option
                          value="Lutron Electronics Company"
                        >
                          Lutron Electronics Company
                        </option>
                      </Field>
                    </div>
                    <div>
                      <Label value="Product Name" />
                      <Field
                        as={Select}
                        name="product"
                        id="product"
                        placeholder="Select the product"
                      >
                        <option value="">Select the Product</option>
                        <option value="Kwikset Home Connect 620 Traditional Keypad">
                        Kwikset Home Connect 620 Traditional Keypad
                        </option>
                        <option value="Yale Assure Pushbutton 216 (Keyed)">Yale Assure Pushbutton 216 (Keyed)</option>
                        <option
                          value="Yale Interconnected 256 Touchscreen Deadbolt/Lever"
                        >
                          Yale Interconnected 256 Touchscreen Deadbolt/Lever
                        </option>
                        <option value="Honeywell T6 pro smartstart">Honeywell T6 pro smartstart</option>
                        <option value="2GIG Z-Wave Plus Programmable Thermostat">2GIG Z-Wave Plus Programmable Thermostat</option>
                        <option value="Aeotec Z-Wave Range Extender 7 (Repeater)">Aeotec Z-Wave Range Extender 7 (Repeater)</option>
                        <option value="Battery Doorbell Camera">Battery Doorbell Camera</option>
                        <option value="Siren Alarm, Door/Window Sensor">Siren Alarm, Door/Window Sensor</option>
                        <option value="HomeSeer Z-Wave Motion Sensor">HomeSeer Z-Wave Motion Sensor</option>
                      </Field>
                    </div>
                    <div>
                      <Label value="Product Quantity" />
                      <FormikTextInput
                        name="quantity"
                        type="number"
                        placeholder="Enter the Quantity"
                      />
                    </div>
                    <div>
                      <Label value="Order Value" />
                      <FormikTextInput
                        name="orderValue"
                        type="number"
                        placeholder="Enter the Order Value"
                      />
                    </div>
                    <div>
                      <Label value="Ordered Date" />
                      <FormikTextInput
                        name="orderedDate"
                        type="date"
                        placeholder="Enter the ordered Date"
                      />
                    </div>
                    <div>
                      <Label value="Delivery Status" />
                      <FormikTextInput
                        name="deliveryStatus"
                        type="text"
                        placeholder="Enter the Status of Delivery"
                      />
                    </div>
                    <Button
                      type="submit"
                      style={{ width: "10rem" }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Place an Order"}
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

export default CreateOrder;
