import { useState } from "react";
import css from "./LoginForm.module.css";
import { nanoid } from "nanoid";
import { ClearIcon, LogInIcon } from "helpers/icons";
import { useDispatch } from "react-redux";
import { login } from "redux/auth/operations";

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

    console.log(`Login submit: \nemail: ${email} \npassword: ${password}`);

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
      <label htmlFor={emailInputId}>
        Email
        <input
          type="email"
          name="email"
          id={emailInputId}
          required
          onChange={handleChange}
          value={email}
        />
      </label>

      <label htmlFor={passwordInputId}>
        Password
        <input
          type="password"
          name="password"
          id={passwordInputId}
          required
          onChange={handleChange}
          value={password}
        />
      </label>

      <div className={css["buttons-bar"]}>
        <button type="submit">
          Log In
          <LogInIcon size={24} />
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={!email && !password}
          className={!email && !password ? css.disabled : undefined}
        >
          Clear
          <ClearIcon size={24} />
        </button>
      </div>
    </form>
  );
};
