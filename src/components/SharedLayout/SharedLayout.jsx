import { Outlet } from "react-router-dom";
import css from "./SharedLayout.module.css";

export const SharedLayout = () => {
  return (
    <div className={css.layout}>
      <header>
        <div>Page header</div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};
