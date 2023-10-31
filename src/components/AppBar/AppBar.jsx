import { useAuth } from "hooks";

import { AuthNavigation, MainNavigation, UserMenu } from "components";
import css from "./AppBar.module.css";

export const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className={css.wrapper}>
      <MainNavigation />
      {isLoggedIn ? <UserMenu /> : <AuthNavigation />}
    </div>
  );
};
