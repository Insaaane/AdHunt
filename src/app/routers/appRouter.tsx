import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalLayout } from "../layout";
import { MainPage } from "@/pages/MainPage";
import { NewAd } from "@/pages/NewAd";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { MyAds } from "@/pages/MyAds";
import { Spin } from "antd";
import { NotFound } from "@/pages/NotFound";
import { AditemPage } from "@/pages/AdItemPage";
import { FavoriteAds } from "@/pages/FavoriteAds";
import { Profile } from "@/pages/Profile";
import { Moderation } from "@/pages/Moderation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: "ads/:adId",
        element: <AditemPage />,
      },

      {
        path: "login",
        element: (
          <PrivateRoute allowedRoles={[]}>
            <LoginPage />
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PrivateRoute allowedRoles={[]}>
            <RegisterPage />
          </PrivateRoute>
        ),
      },

      {
        path: "newAd",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <NewAd />
          </PrivateRoute>
        ),
      },
      {
        path: "editAd/:adId",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <NewAd />
          </PrivateRoute>
        ),
      },
      {
        path: "my-ads",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <MyAds />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <FavoriteAds />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "moderation",
        element: (
          <PrivateRoute allowedRoles={["moderator"]}>
            <Moderation />
          </PrivateRoute>
        ),
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export const AppRouter = () => {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
