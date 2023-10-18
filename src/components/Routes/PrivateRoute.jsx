import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

/**
 * - If the route is private, the user is'n logged in and page isn't refreshing user, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
