import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInFailure, signInSuccess } from "../Redux/Slice/UserSlice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;
  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${apiurl}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("Token", data.token);
        toast.success("Logged in successfully")
        dispatch(signInSuccess(data));

        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <Button
      className="bg-gradient-to-r from-cyan-500 to-blue-500"
      type="button"
      onClick={handleSubmit}
    >
      <AiFillGoogleCircle className="w-8 h-5" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
