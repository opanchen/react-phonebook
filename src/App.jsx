import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "components";

function App() {
  const HomePage = lazy(() => import("./pages/Home/Home"));
  const RegisterPage = lazy(() => import("./pages/Register/Register"));
  const LoginPage = lazy(() => import("./pages/Login/Login"));
  const ContactsPage = lazy(() => import("./pages/Contacts/Contacts"));
  const AllContacts = lazy(() =>
    import("./components/AllContacts/AllContacts")
  );
  const FavContacts = lazy(() =>
    import("./components/FavContacts/FavContacts")
  );

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacts" element={<ContactsPage />}>
          <Route path="all" element={<AllContacts />} />
          <Route path="favorite" element={<FavContacts />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
