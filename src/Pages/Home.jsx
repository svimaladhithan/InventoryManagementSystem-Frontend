import React from "react";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";

const Home = () => {
  return (
    <div className="home_container mx-auto over">
      <div className="font-semibold dark:text-white text-6xl text-center mt-10">
        <span className="px-2 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
          Inventory
        </span>
        &nbsp;Stop
      </div>
      <div className="p-10 font-semibold text-xl text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Streamline your inventory operations with our intuitive and powerful
          Inventory Management System. Whether you're managing products,
          vendors, or orders, our platform simplifies every aspect of your
          inventory workflow. From real-time updates to comprehensive analytics,
          stay in control of your inventory like never before.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/dashboard">
          <Card
            className="max-w-sm mt-10 ml-10 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            imgSrc="https://www.shutterstock.com/image-vector/dashboard-vector-icon-website-other-600nw-1421089664.jpg"
            horizontal
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h5>
            <p className="text-gray-500 dark:text-gray-400">
              Click here to see product details and manage
            </p>
          </Card>
        </Link>
        <Link to="/vendors">
          <Card
            className="max-w-sm mt-10 ml-10 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            imgSrc="https://www.shutterstock.com/image-vector/vendor-relations-logistic-manager-line-600nw-2382210913.jpg"
            horizontal
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Vendors
            </h5>
            <p className="text-gray-500 dark:text-gray-400">
              Click here to see vendor information
            </p>
          </Card>
        </Link>
        <Link to="/orders">
          <Card
            className="max-w-sm mt-10 ml-10 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            imgSrc="data:image/png;base64,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"
            horizontal
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Order Tracking
            </h5>
            <p className="text-gray-500 dark:text-gray-400">
              Click here to see order details
            </p>
          </Card>
        </Link>
        <Link to="/analytics">
          <Card
            className="max-w-sm mt-10 ml-10 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            imgSrc="https://www.shutterstock.com/image-illustration/chart-graph-analytics-icon-vector-600nw-2290715795.jpg"
            horizontal
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Analytics
            </h5>
            <p className="text-gray-500 dark:text-gray-400">
              Click here to see the analytics
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;
