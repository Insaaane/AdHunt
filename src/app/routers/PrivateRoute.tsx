import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { TRole } from "@/shared/model";
import { getUserInfo } from "@/entities/User";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: TRole[];
}

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = useAppSelector(getUserInfo).role;

  // Неавторизованный пользователь
  if (!token) {
    if (["/", "/login", "/register"].includes(location.pathname)) {
      return <>{children}</>;
    }
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Авторизованный пользователь
  if (role === "moderator") {
    if (location.pathname !== "/moderation") {
      return <Navigate to="/moderation" replace />;
    }
    if (!allowedRoles.includes("moderator")) {
      return <Navigate to="/moderation" replace />;
    }
    return <>{children}</>;
  }

  if (role === "user") {
    let from =
      (location.state &&
        typeof location.state === "object" &&
        "from" in location.state &&
        location.state.from) ||
      "/";
    if (from === "/profile") {
      from = "/";
    }
    if (["/login", "/register", "/moderation"].includes(location.pathname)) {
      return <Navigate to={from} replace />;
    }
    if (!allowedRoles.includes("user")) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};
