import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import TourInfo from "../pages/TourInfo";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import { RegistterPage } from "../pages/RegistterPage";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../layout/MainPage";
import { Layout } from "../layout/Layout";
import { PrivateRoute } from "./PrivateRoute";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../store/slices/authSlice";

export const AppRoutes = () => {
  
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.auth);

  console.log(role);

  useEffect(() => {
    const { data } = JSON.parse(localStorage.getItem("auth")) || {};

    setState(data?.role);
    dispatch(isAuth(state));
  }, [dispatch, state]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <PrivateRoute
              Component={<MainPage />}
              fallBackPath="/login"
              isAllowed={!role}
            />
          ),
        },
        {
          path: "/tourInfo/:tourId",
          element: (
            <PrivateRoute
              Component={<TourInfo />}
              fallBackPath="/login"
              isAllowed={!role}
            />
          ),
        },

        {
          path: "/user",
          element: (
            <PrivateRoute
              Component={<UserPage />}
              fallBackPath="/login"
              isAllowed={role !== "USER"}
            />
          ),
        },
      ],
    },

    {
      path: "/admin",
      element: (
        <PrivateRoute
          Component={<AdminPage />}
          fallBackPath="/login"
          isAllowed={role !== "ADMIN"}
        />
      ),
    },
    {
      path: "/register",
      element: (
        <PrivateRoute
          Component={<RegistterPage />}
          fallBackPath="/"
          isAllowed={role}
        />
      ),
    },
    {
      path: "/login",
      element: (
        <PrivateRoute
          Component={<LoginPage />}
          fallBackPath="/"
          isAllowed={role}
          redirectPath={
            role === "USER" ? "/user" : role === "ADMIN" ? "/admin" : "/"
          }
        />
      ),
    },

    {
      path: "*",
      element: (
        <div>
          <h1>404 Not found</h1>

          <button>
            <Link to="/">go to Home pages</Link>
          </button>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
