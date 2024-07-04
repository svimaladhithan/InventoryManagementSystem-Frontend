import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  Navbar,
} from "flowbite-react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../Redux/Slice/ThemeSlice";
import { signOutSuccess } from "../Redux/Slice/UserSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentuser } = useSelector((state) => state.user);
  console.log(currentuser);
  const { theme } = useSelector((state) => state.theme);
  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  return (
    <div>
      <Navbar className="border-b-2 dark:bg-black">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
            Inventory
          </span>
          Stop
        </Link>
        
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-14 h-9 hidden sm:inline bg-gradient-to-r from-cyan-500 to-blue-500"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          {currentuser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentuser.rest.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {currentuser.rest.username}
                </span>
              </Dropdown.Header>
              <Link to={"/profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <DropdownDivider />
              <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button gradientDuoTone="cyanToBlue">Signin</Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/dashboard"} as={"div"}>
            <Link to="/dashboard">Dashboard</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/vendors"} as={"div"}>
            <Link to="/vendors">Vendors</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/orders"} as={"div"}>
            <Link to="/orders">Track Orders</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/analytics"} as={"div"}>
            <Link to="/analytics">Analytics</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
