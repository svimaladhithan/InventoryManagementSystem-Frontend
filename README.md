# Inventory Management System

## Admin Credentials:
- **Email**: admin@gmail.com
- **Password**: P@ssw0rd

## User Credentials:
- **Email**: user@gmail.com
- **Password**: User@123

## Requirements:
- Design and develop an application using the full-stack.
- Users can view all their inventory products, stocks, order, vendor details on the dashboard.
- Users can create, update, delete, and view all their inventory product details on the dashboard (CRUD).
- Enables users to track inventory stocks, including quantities, locations, and product details on individual components.
- Shows related notifications or alerts to refill stocking and avoid running out of stock.
- Allows users to track purchase orders for inventory, including supplier information, order status, and delivery dates.
- Generates reports and analytics on important inventory details like stock levels, turnover rates, and inventory value.

## Frontend Development Approach:

### Project Setup and Planning:
- Completed setting up the development environment with **React** and necessary dependencies.
- Analyzed the project requirements.

### UI Design and Component Implementation:
- Implemented the user interface based on the provided requirements and additional features.
- Created the following screens:

#### Registration:
- Displays fields where users can sign up by entering their username, email, and password.
- Includes the option to sign up using **OAuth**.
- After registration, the app provides the option to log in.

#### Sign In:
- Displays fields where users can sign in by entering their email and password.
- Includes the option to sign in using **OAuth**.

#### Home:
- Displays the app logo and contains routes for **Dashboard**, **Analytics**, **Vendors**, and **Orders**, as well as a footer.
- Provides the option to navigate to the **Profile** screen.

#### Dashboard:
- Displays details of all available products and allows all users to **update and delete** them.
- Shows a **Refill Required** alert when stocks go below 20.
- Includes a role-based condition where only the **Admin** can **Add Product** in the Dashboard.
- The Add Product and Edit buttons redirect users to the respective pages to perform add and edit operations.

#### Vendors:
- Displays details about the vendors and the products available with them.
- Includes a role-based condition where only the **Admin** can add a **new Vendor**.

#### Track Orders:
- Displays orders placed to the vendors along with their Name, Quantity, Order value, Order placed date, and Delivery status.

#### Analytics:
- Displays an **animated line chart** that shows the analytics for each product sold in the last four years.

#### Profile:
- Displays the Profile image, Username, and Email.
- Includes the option to update the username, email, and password.
- Includes the option to delete the account, along with a user confirmation modal.

### Validation:
- Added **React Router** for handling client-side routing.
- Implemented **Formik and Yup** validation for Sign Up, Login, Add Products, Edit Products, Add Vendor, and Profile Update screens.

### API Integration and Authentication:
- Tested the APIs (created with backend) with Postman for proper UI designing.
- Used `fetch` for the API requests.

### Redux Setup and State Management:
- Implemented `@reduxjs/toolkit` library for state management.
- Defined actions, reducers, and initial state for handling the states globally around the app.
- Integrated Redux with the app components to manage state changes.

### Surprise Features:
- Added **OAuth authentication** for registration and login.
- Added **Dark mode** support for the app.
- Allowed Users to update profile information and **delete their account** if needed.
- Allowed **Admin** to add a new vendor to the system.

### Testing:
- Tested the app's functionality, user interface, and responsiveness.

### Coding Standards:
- Followed proper naming conventions and folder structure.
- Added comments wherever necessary.
- Implemented reusable components and common utilities.
