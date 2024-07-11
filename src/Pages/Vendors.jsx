import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendor } from "../Redux/Slice/VendorSlice";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const Vendors = () => {
  const dispatch = useDispatch();
  const apiurl= import.meta.env.VITE_API_URL;
  const vendors = useSelector((state) => state.vendors.vendor);
  const {currentuser}= useSelector((state)=>state.user)
  // console.log(vendors);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiurl}/get-vendor`);
      // console.log(response);
      const data = await response.json();
      dispatch(getVendor(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5 ml-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {vendors.map((vendor) => (
        <div key={vendor.id}>
          <Card className="max-w-sm bg-gradient-to-r from-cyan-500 to-blue-500 mt-3 h-full hover:transform hover:scale-105 transition duration-300">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Vendor Info
            </h5>
            <span className="text-3xl font-semibold">{vendor.name}</span>
            <ul className="my-7 space-y-2">
              <li className="flex space-x-3">
                <strong>Name:&nbsp;</strong> <div>{vendor.name} </div>
              </li>
              <li className="flex space-x-3">
                <strong>Phone:&nbsp;</strong>
                <div> {vendor.phone} </div>
              </li>
              <li className="flex space-x-3">
                <strong>Address:&nbsp;</strong> {vendor.address}
              </li>
              <li className="flex space-x-3">
                <strong>GST No:&nbsp;</strong> {vendor.gst_no}
              </li>
              <li className="flex space-x-3">
                <strong>Products:</strong>&nbsp;
                <br />
                <div>
                  {vendor.products.map((ele, index) => (
                    <div key={ele}>
                      {index + 1}.{ele}
                      {index !== vendor.products.length - 1 && ", "}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </Card>
        </div>
      ))}
        </div>
        <div className="mt-7">
            {currentuser.rest.isAdmin && <Link to="/createVendor" className="mt-6">
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
          Add Vendor
        </Button>
      </Link>}
      
      </div>
    </div>
  );
};

export default Vendors;
