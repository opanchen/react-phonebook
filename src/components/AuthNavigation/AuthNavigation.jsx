import { NavLink } from "react-router-dom";
import css from "./AuthNavigation.module.css";

export const AuthNavigation = () => {
  const authNavLinkClassName = ({ isActive }) =>
    isActive ? css["link-active"] : css.link;

  return (
    <ul className={css.nav}>
      <li>
        <NavLink className={authNavLinkClassName} to="/register">
          Register
        </NavLink>
      </li>

      <li>
        <NavLink className={authNavLinkClassName} to="/login">
          Log In
        </NavLink>
      </li>
    </ul>
  );
};
