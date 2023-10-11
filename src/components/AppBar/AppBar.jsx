import { AuthNavigation, MainNavigation, UserMenu } from "components";
import css from "./AppBar.module.css";
import { useAuth } from "hooks";

export const AppBar = () => {
  const { isLoggedIn } = useAuth();
  // console.log(isLoggedIn);

  return (
    <div className={css.wrapper}>
      <MainNavigation />
      {isLoggedIn ? <UserMenu /> : <AuthNavigation />}
    </div>
  );
};
