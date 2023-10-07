import { Outlet } from "react-router-dom";
import css from "./SharedLayout.module.css";
import { AppBar, Container } from "components";
import { Suspense } from "react";

export const SharedLayout = () => {
  return (
    <div className={css.layout}>
      <header>
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
    </div>
  );
};
