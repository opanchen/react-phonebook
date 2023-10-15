import { ImSpinner3 } from "react-icons/im";
import css from "./Spinner.module.css";

export const Spinner = ({ size = 12, color = undefined }) => {
  return <ImSpinner3 size={size} color={color} className={css["icon-spin"]} />;
};
