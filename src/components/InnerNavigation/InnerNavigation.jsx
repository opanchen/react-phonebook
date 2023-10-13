import { Link, useLocation } from "react-router-dom";
import css from "./InnerNavigation.module.css";

export const InnerNavigation = () => {
  const location = useLocation();
  console.log(location);

  const innerNavLinkClassName = (path) =>
    location.pathname.includes(path) ? `${css.link} ${css.current}` : css.link;

  return (
    <ul className={css.nav}>
      <li>
        <Link to="all" className={innerNavLinkClassName("all")}>
          All
        </Link>
      </li>
      <li>
        <Link to="favorite" className={innerNavLinkClassName("favorite")}>
          Favorite
        </Link>
      </li>
    </ul>
  );
};
