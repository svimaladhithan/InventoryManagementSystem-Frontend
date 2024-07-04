

import { Alert, Button, Spinner } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../Redux/Slice/UserSlice";
import OAuth from "../Components/OAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../Components/FormikTextInput";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const apiurl = import.meta.env.VITE_API_URL;

  // Define initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(signInStart());
      const response = await fetch(`${apiurl}/auth/signin-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else if (response.ok) {
        localStorage.setItem("Token", data.token);
        dispatch(signInSuccess(data));
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <div className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
              Inventory
            </span>
            Stop
          </div>
          <p className="text-sm mt-6">
            You can sign in with your Email and password or you can use the Google.
          </p>
        </div>
        <div className="flex-1">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <FormikTextInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
                  id="email"
                  name="email"
                />
                <FormikTextInput
                  label="Password"
                  type="password"
                  placeholder="Enter Your Password"
                  id="password"
                  name="password"
                />
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Spinner
                        color="info"
                        aria-label="Info spinner example"
                        size="sm"
                      />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <OAuth />
              </Form>
            )}
          </Formik>
          <div className="flex gap-2 text-sm mt-6">
            <span>Don't Have An Account ?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" icon={HiInformationCircle} className="mt-5">
              <span className="font-medium me-2">🥴OOPS!</span>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;