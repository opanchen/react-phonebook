import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectIsRegistered,
  selectIsVerifyMessageResended,
  selectUser,
} from "redux/auth/selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isRegistered = useSelector(selectIsRegistered);
  const isVerifyMessageResended = useSelector(selectIsVerifyMessageResended);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    isRefreshing,
    isRegistered,
    isVerifyMessageResended,
    user,
  };
};
