import { useAuth } from "hooks";
import { NavLink } from "react-router-dom";

import css from "./MainNavigation.module.css";

export const MainNavigation = () => {
  const { isLoggedIn } = useAuth();

  const navLinkClassName = ({ isActive }) =>
    isActive ? `${css.link} ${css.current}` : css.link;

  return (
    <nav>
      <ul className={css["nav-list"]}>
        <li>
          <NavLink className={navLinkClassName} to="/">
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <li>
            <NavLink className={navLinkClassName} to="/contacts">
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
