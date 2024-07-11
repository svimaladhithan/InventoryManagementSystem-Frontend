import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct } from "../Redux/Slice/ProductSlice";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { GoAlertFill } from "react-icons/go";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const { currentuser } = useSelector((state) => state.user);
  const apiurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await fetch(`${apiurl}/getProduct`);
      const data = await response.json();
      dispatch(getProduct(data.result));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${apiurl}/deleteProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(deleteProduct({ id }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Stocks Available</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products.map((ele) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={ele.id}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {ele.name}
              </Table.Cell>
              <Table.Cell>{ele.category}</Table.Cell>
              <Table.Cell>${ele.price}</Table.Cell>
              <Table.Cell>{ele.description}</Table.Cell>
              <Table.Cell>{ele.quantity}</Table.Cell>
              <Table.Cell className="text-red-700 font-semibold">
                {ele.quantity < 20 ? (
                  <span className="flex justify-center blink">
                    <GoAlertFill />
                    &nbsp;Refill Required
                  </span>
                ) : null}
              </Table.Cell>
              {currentuser.rest.isAdmin && 
              <Table.Cell>
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`/updateProduct/${ele.id}`}
              >
                Edit
              </Link>
            </Table.Cell>
            }
            
              {currentuser.rest.isAdmin && 
              <Table.Cell>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(ele.id)}
                >
                  Delete
                </button>
                </Table.Cell>
              }
              
              
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {currentuser.rest.isAdmin && (
        <Link to="/createProduct">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
            Add Products
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
