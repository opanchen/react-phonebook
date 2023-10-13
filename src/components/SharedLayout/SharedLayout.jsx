import { Outlet } from "react-router-dom";
import { AppBar, Container } from "components";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./SharedLayout.module.css";

export const SharedLayout = () => {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <Container>
          <AppBar />
        </Container>
      </header>

      <main className={css.main}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <footer>
        <div>Footer</div>
      </footer>
      <ToastContainer autoClose={3000} />
    </div>
  );
};
