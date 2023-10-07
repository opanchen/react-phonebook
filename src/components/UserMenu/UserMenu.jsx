import { LogOutIcon } from "helpers/icons";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const handleLogOut = () => {
    console.log("click on log out...");
    //   dispatch(logOut());
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>User</p>
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
