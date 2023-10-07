import { AuthNavigation, MainNavigation, UserMenu } from "components";
import css from "./AppBar.module.css";

export const AppBar = () => {
  return (
    <div className={css.wrapper}>
      <MainNavigation />
      <AuthNavigation />
      <UserMenu />
    </div>
  );
};
