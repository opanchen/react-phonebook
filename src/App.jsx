import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, RestrictedRoute, SharedLayout } from "components";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks";
import { refreshUser } from "redux/auth/operations";

const HomePage = lazy(() => import("./pages/Home/Home"));
const RegisterPage = lazy(() => import("./pages/Register/Register"));
const LoginPage = lazy(() => import("./pages/Login/Login"));
const ContactsPage = lazy(() => import("./pages/Contacts/Contacts"));
const AllContacts = lazy(() => import("./components/AllContacts/AllContacts"));
const FavContacts = lazy(() => import("./components/FavContacts/FavContacts"));
const VerificationPage = lazy(() => import("./pages/Verify/Verify"));
const ContactDetailsPage = lazy(() =>
  import("./pages/ContactDetails/ContactDetails")
);

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        >
          <Route
            path="all"
            element={
              <PrivateRoute redirectTo="/login" component={<AllContacts />} />
            }
          />
          <Route
            path="favorite"
            element={
              <PrivateRoute redirectTo="/login" component={<FavContacts />} />
            }
          />
        </Route>
        <Route
          path="/contacts/:id"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<ContactDetailsPage />}
            />
          }
        />
        <Route
          path="/api/users/verify/:token"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<VerificationPage />}
            />
          }
        />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
