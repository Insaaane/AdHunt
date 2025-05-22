import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalLayout } from "../layout";
import { MainPage } from "@/pages/MainPage";
import { NewAd } from "@/pages/NewAd";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "newAd", element: <NewAd /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },

  { path: "*", element: <>Пусто</> },
]);

export const AppRouter = () => {
  return (
    <Suspense fallback={<>Загрузка</>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
