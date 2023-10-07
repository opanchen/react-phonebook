import { Link } from "react-router-dom";
import css from "./InnerNavigation.module.css";

export const InnerNavigation = () => {
  return (
    <ul className={css.nav}>
      <li>
        <Link to="all">All</Link>
      </li>
      <li>
        <Link to="favorite">Favorite</Link>
      </li>
    </ul>
  );
};
