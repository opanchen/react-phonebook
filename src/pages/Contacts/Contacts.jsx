import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Contacts = () => {
  return (
    <div>
      Contacts page
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Contacts;
