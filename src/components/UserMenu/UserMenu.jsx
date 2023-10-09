import { LogOutIcon } from "helpers/icons";
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
import { logout } from "redux/auth/operations";
import { useAuth } from "hooks";

export const UserMenu = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  //   console.log(user);

  const handleLogOut = () => {
    console.log("click on log out...");
    dispatch(logout());
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>{user.name ? user.name : "User"}</p>
      <button
        className={css["btn-logout"]}
        type="button"
        onClick={handleLogOut}
      >
        <span className={css["btn-label"]}>Logout</span>
        <LogOutIcon size={24} />
      </button>
    </div>
  );
};
