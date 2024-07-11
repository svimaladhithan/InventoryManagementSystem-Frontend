import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../Redux/Slice/OrderSlice";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const PurchaseOrder = () => {
  const dispatch = useDispatch();
  const apiurl = import.meta.env.VITE_API_URL;
  const { currentuser } = useSelector((state) => state.user);
  const userId = currentuser?.rest?._id;
  const orders = useSelector((state) => state.orders.orders);
  useEffect(() => {
    if (userId) {
      fetchData();
    } // Fetch order data when component mounts
  }, [userId]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`${apiurl}/get-order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      dispatch(getOrder(data.result)); // Dispatch getOrder action to update orders state in Redux store
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5 ml-4">
      <div className="text-center font-semibold text-3xl">My Orders</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.map((order, index) => (
          <div key={index}>
            <Card className="max-w-sm  mt-3 h-full hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <span className="text-3xl">
                <p>Purchase order to</p>
                <strong className="text-blue-400">{order.name}</strong>
              </span>
              <hr />
              <ul className="my-7 space-y-2">
                <li className="flex space-x-3">
                  <strong>Product Name:&nbsp;</strong>
                  <div className="order">{order.product}</div>
                </li>
                <li className="flex space-x-3">
                  <strong>Quantity:&nbsp;</strong>
                  <div className="order"> {order.quantity} </div>
                </li>
                <li className="flex space-x-3">
                  <strong>Order Value:&nbsp;</strong>
                  <div className="order"> ${order.orderValue} </div>
                </li>
                <li className="flex space-x-3">
                  <strong>Order Placed on:&nbsp;</strong>
                  <div className="order"> {order.orderedDate} </div>
                </li>
                <li className="flex space-x-3">
                  <strong>Delivery Status:&nbsp;</strong>
                  <div className="order"> {order.deliveryStatus} </div>
                </li>
              </ul>
              <Link to={`/updateOrder/${order.id}`}>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  Update
                </Button>
              </Link>
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-7">
        <Link to="/createOrder">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
            Place an Order
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PurchaseOrder;
