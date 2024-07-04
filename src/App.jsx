import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import FooterComp from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import CreateProduct from "./Pages/CreateProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import Vendors from "./Pages/Vendors";
import CreateVendor from "./Pages/CreateVendor";
import PurchaseOrder from "./Pages/PurchaseOrder";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Analytics from "./Pages/Analytics";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/orders" element={<PurchaseOrder />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/analytics" element={<Analytics />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/createVendor" element={<CreateVendor />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </div>
  );
};

export default App;
