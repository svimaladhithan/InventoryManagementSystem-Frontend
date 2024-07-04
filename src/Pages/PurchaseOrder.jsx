import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../Redux/Slice/OrderSlice";
import { Button, Card } from "flowbite-react";

const PurchaseOrder = () => {
  const dispatch = useDispatch();
  const apiurl = import.meta.env.VITE_API_URL;
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);
  useEffect(() => {
    fetchData();    // Fetch order data when component mounts
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiurl}/get-order`);
      const data = await response.json();
      dispatch(getOrder(data.result));  // Dispatch getOrder action to update orders state in Redux store
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5 ml-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.map((order) => (
          <Card className="max-w-sm  mt-3 h-full hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <span className="text-3xl">
              <p>Purchase order to</p>
              <strong className="text-blue-400">{order.name}</strong>
            </span>
            <hr />
            <ul className="my-7 space-y-2">
              <li className="flex space-x-3">
                <strong>Product Name:&nbsp;</strong>
                <div className="order">{order.name}</div>
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
          </Card>
        ))}
      </div>
      <div className="mt-7"></div>
    </div>
  );
};

export default PurchaseOrder;
