import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "redux/auth/operations";
import { nanoid } from "nanoid";

import { ClearIcon, LogInIcon } from "helpers/icons";
import css from "./LoginForm.module.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name: inputName, value } = e.currentTarget;

    switch (inputName) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log(
          `Error: there isn't ${inputName} input for value ${value}. Check form markup.`
        );
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));

    reset();
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  return (
    <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
      <label className={css["form-label"]} htmlFor={emailInputId}>
        Email
        <input
          type="email"
          name="email"
          id={emailInputId}
          required
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
          title="Invalid email"
          onChange={handleChange}
          value={email}
          className={css["form-input"]}
        />
      </label>

      <label className={css["form-label"]} htmlFor={passwordInputId}>
        Password
        <input
          type="password"
          name="password"
          id={passwordInputId}
          required
          onChange={handleChange}
          value={password}
          className={css["form-input"]}
        />
      </label>

      <div className={css["buttons-bar"]}>
        <button className={css["submit-btn"]} type="submit">
          Log In
          <LogInIcon size={24} />
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={!email && !password}
          className={
            !email && !password
              ? `${css.disabled} ${css["clear-btn"]}`
              : css["clear-btn"]
          }
        >
          <span className={css["clear-btn-label"]}>Clear</span>
          <ClearIcon size={24} />
        </button>
      </div>
    </form>
  );
};
