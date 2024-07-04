import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiInformationCircle } from "react-icons/hi";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../Redux/Slice/UserSlice";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikTextInput from './FormikTextInput'; // Adjust the path as per your project structure

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').matches(
    /^[a-z0-9]{7,16}$/,
    'Username must be between 7 and 16 characters, lowercase, and no special characters'
  ),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const DashboardProfile = () => {
  const dispatch = useDispatch();
  const { currentuser, loading, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const apiurl = import.meta.env.VITE_API_URL;

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Firebase image upload and storage part
  const uploadImage = async () => {
    setImageFileUploadError(null);
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload the image (File size must be less than 2MB)"
        );
        setImageFileUrl(null);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  // Function to handle form submission (update user profile)
  const handleSubmit = async (values, { setSubmitting }) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    try {
      dispatch(updateStart());
      const response = await fetch(
        `${apiurl}/user/update/${currentuser.rest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User Profile Updated Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to handle user signout
  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
  };

  // Function to handle user deletion
  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const response = await fetch(
        `${apiurl}/user/delete/${currentuser.rest._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <Formik
        initialValues={{
          username: currentuser.rest.username,
          email: currentuser.rest.email,
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">
            <input
              type="file"
              accept="image/*"
              ref={filePickerRef}
              onChange={handleImageChange}
              hidden
            />
            <div
              className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
              onClick={() => filePickerRef.current.click()}
            >
              {imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62,150,190,${
                        imageFileUploadProgress / 100
                      })`,
                    },
                  }}
                />
              )}

              <img
                src={imageFileUrl || currentuser.rest.profilePicture}
                alt="user"
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                  imageFileUploadProgress &&
                  imageFileUploadProgress < 100 &&
                  "opacity-60"
                }`}
              />
            </div>
            {imageFileUploadError && (
              <Alert color="failure" icon={HiInformationCircle} className="mt-5">
                <span className="font-medium me-2">OOPS!🤔</span>
                {imageFileUploadError}
              </Alert>
            )}
            <FormikTextInput
              type="text"
              id="username"
              name="username"
              label="Username"
              disabled={isSubmitting}
            />
            <FormikTextInput
              type="email"
              id="email"
              name="email"
              label="Email"
              disabled={isSubmitting}
            />
            <FormikTextInput
              type="password"
              id="password"
              name="password"
              label="Password"
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500"
              disabled={isSubmitting || loading || imageFileUploading}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="text-red-600 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>

      {updateUserSuccess && (
        <Alert color="success" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium me-2">Yay!😉</span>
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium me-2">OOPS!🤔</span>
          {updateUserError}
        </Alert>
      )}

      {error && (
        <Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium me-2">OOPS!🤔</span>
          {error}
        </Alert>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-500 dark:text-gray-300 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Nope!
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardProfile;