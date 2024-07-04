import { Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../Components/FormikTextInput";

const Signup = () => {
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;

  // Define initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(7, "Username must be at least 7 characters")
      .max(16, "Username must be at most 16 characters")
      .matches(/^\S*$/, "Username must not contain spaces")
      .matches(/^[a-z0-9_]+$/, "Username must be lowercase and contain only alphanumeric characters and underscores"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${apiurl}/auth/register-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      toast.success("Signed up successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error (e.g., setErrorMessage(error.message))
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
            You can sign up with your Email and password or you can use the
            Google.
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
                  label="Username"
                  type="text"
                  placeholder="Enter your User Name"
                  id="username"
                  name="username"
                />
                <FormikTextInput
                  label="Email"
                  type="email"
                  placeholder="name@company.com"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        color="info"
                        aria-label="Info spinner example"
                        size="sm"
                      />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <OAuth />
              </Form>
            )}
          </Formik>
          <div className="flex gap-2 text-sm mt-6">
            <span>Already Have An Account ?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;