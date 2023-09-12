import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Shared/AuthDesign/Login/Login";
import Register from "../Pages/Shared/AuthDesign/Register/Register";
import Dashboard from "../Layouts/Dashboard";

import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser";
import StudentHome from "../Pages/Dashboard/StudentDashboard/StudentHome";
import InstructorHome from "../Pages/Dashboard/InstructorDashboard/InstructorHome";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome";
import StudentRoute from "./StudentRoute";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../Pages/Dashboard/InstructorDashboard/AddClass";
import MyAddedClass from "../Pages/Dashboard/InstructorDashboard/MyAddedClass";
import ManageClass from "../Pages/Dashboard/AdminDashboard/ManageClass";
import FeedBack from "../Pages/Dashboard/AdminDashboard/FeedBack";
import ClassUpdate from "../Pages/Dashboard/InstructorDashboard/ClassUpdate";
import AllInstructor from "../Pages/AllInstructor/AllInstructor";
import AllClass from "../Pages/AllClass.jsx/AllClass";
import MySelectedClass from "../Pages/Dashboard/StudentDashboard/MySelectedClass";
import AuthRoute from "./AuthRoute";
import Payment from "../Pages/Dashboard/StudentDashboard/Pyments/Payment";
import PaymentHistory from "../Pages/Dashboard/StudentDashboard/PaymentHistory";
import EnrollClasses from "../Pages/Dashboard/StudentDashboard/EnrollClasses";
import Error from "../Pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <AllInstructor></AllInstructor>,
        loader: () =>
          fetch("https://photgraphy-school-server.vercel.app/instructors"),
      },
      {
        path: "/classes",
        element: <AllClass></AllClass>,
        loader: () =>
          fetch("https://photgraphy-school-server.vercel.app/all-classes"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    errorElement: <Error></Error>,
    element: (
      <AuthRoute>
        <Dashboard></Dashboard>
      </AuthRoute>
    ),
    children: [
      {
        path: "student-home",
        element: (
          <StudentRoute>
            <StudentHome></StudentHome>
          </StudentRoute>
        ),
      },
      {
        path: "my-selected-class",
        element: (
          <StudentRoute>
            <MySelectedClass></MySelectedClass>
          </StudentRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <StudentRoute>
            <Payment></Payment>
          </StudentRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <StudentRoute>
            <PaymentHistory></PaymentHistory>
          </StudentRoute>
        ),
      },
      {
        path: "enroll-class",
        element: (
          <StudentRoute>
            <EnrollClasses></EnrollClasses>
          </StudentRoute>
        ),
      },

      //instructor route
      {
        path: "instructor-home",
        element: (
          <InstructorRoute>
            <InstructorHome></InstructorHome>
          </InstructorRoute>
        ),
      },
      {
        path: "add-class",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "my-class",
        element: (
          <InstructorRoute>
            <MyAddedClass></MyAddedClass>
          </InstructorRoute>
        ),
      },
      {
        path: "class-update/:id",
        element: (
          <InstructorRoute>
            <ClassUpdate></ClassUpdate>
          </InstructorRoute>
        ),
      },

      //admin route
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "manage-class",
        element: (
          <AdminRoute>
            <ManageClass></ManageClass>
          </AdminRoute>
        ),
      },
      {
        path: "feedback/:id",
        element: (
          <AdminRoute>
            <FeedBack></FeedBack>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
