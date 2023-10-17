import { ErrorIcon } from "helpers/icons";
import css from "./FallbackView.module.css";

export const FallbackView = ({ message, type = "init" }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.message}>
        <div className={css.heading}>
          <ErrorIcon
            size={40}
            color={type === "error" ? "#a60909" : "#ff9747"}
          />

          <p
            className={css.label}
            style={{ color: type === "error" ? "#a60909" : "#ff9747" }}
          >
            {type === "error" ? "Error: " : "Warning: "}
          </p>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};
