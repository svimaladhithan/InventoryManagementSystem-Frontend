**Inventory Management System**

Admin Credentials- email- abinaya@gmail.com, password- P@ssw0rd

### Requirements:

-   Design and develop an Application using the full-stack.
-   Users can view all their inventory products, stocks, order, vendor details on the dashboard.
-   Users can create, update , delete , view all their inventory product details on the dashboard (CRUD).
-   Enables users to track inventory stocks, including quantities, locations, and product details on individual components.
-   Show related notifications or alerts refill stocking and avoid running out of stock.
-   Allows users track purchase orders for inventory, including supplier information, order status, and delivery dates
-   Generate reports and analytics on important inventory details like stock levels, turnover rates, and inventory value.

###Frontend Development Approach:

**Project Setup and Planning:**

Completed setting up the development environment with React, and necessary dependencies.
Analysed the project requirements.

**UI Design and Component Implementation:**

Implemented the user interface based on the provided requirements and additional features.
Created the following screens,

    **Registration Screen** -Displays the registration screen where the user can put their username, email and password.
                            -Once the registration completed, the app will give the option to user to login
    **Home Screen**         - Displays the app logo, contains the route for dashboard, analytics, vendors and orders.
                            - Displays the custom loader till the data is loaded.
    **dashboard**           - Displays the details of all the products available and gives the access to user to update and delete it.
                            - The refill required alert will be shown when the stocks go below 20.
                            - Only admin can able to see the "Add Product" button in the dashboard.
                            - Add product and edit button will redirect the user to the respective page where they can perform add and edit operation.
    **Orders**              - Displays the orders that are placed to the vendors.
                            - Only admins can able to place the order.
    **Vendors**             - Displays the details about the vendors and the products available with them.
                            - Only admins can add a new vendor.
    **Analytics**           - Displays how much each product sold every year.

**API Integration and Authentication:**

Before implementing, tested the APIs with postman to understand the response structure for proper UI designing.
Used fetch for the API requests.

**Redux Setup and State Management:**

Implemented @reduxjs/toolkit library for state management.
Defined actions, reducers, and initial state for handling the states globally around the app.
Integrate Redux with the app components to manage state changes.
Integrated error handling.

**Surprise features:**

- Added OAuth authentication for registration and login.
- Added dark mode for the app.
- Allows user to update their information and delete their account if needed.
- Allows Admin to create a new vendor to the system.

**Testing:**

Tested the app's functionality, user interface, and responsiveness.

**Coding standards:**

Followed proper naming conventions and folder structure.
Added comments wherever necessary.
Implemented reusable components and common utilities.
