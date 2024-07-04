import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../Redux/Slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";

const DashboardSidebar = () => {
  const { currentuser } = useSelector((state) => state.user);
  console.log(currentuser);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);

  // Function to handle user sign out

  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  return (
    <Sidebar className="w-full md:w-58">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiUser}
            label={currentuser.rest.isAdmin ? "Admin" : "User"}
            labelColor="dark"
            as="div"
          >
            {currentuser.rest.username}
          </Sidebar.Item>
          <Link to="/dashboard">
            <Sidebar.Item
              icon={RxDashboard}
              active={location === "dashboard"}
              as="div"
            >
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link to="/vendors">
            <Sidebar.Item
              icon={FaUsers}
              active={location === "vendors"}
              as="div"
            >
              Vendors
            </Sidebar.Item>
          </Link>
          <Link to="/orders">
            <Sidebar.Item
              icon={BsCart4}
              active={location === "purchaseOrders"}
              as="div"
            >
              Orders
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignout}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
