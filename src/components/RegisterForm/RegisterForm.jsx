import { useState } from "react";
import css from "./RegisterForm.module.css";
import { nanoid } from "nanoid";
import { ClearIcon } from "helpers/icons";
import { useDispatch } from "react-redux";
import { register } from "redux/auth/operations";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name: inputName, value } = e.currentTarget;

    switch (inputName) {
      case "name":
        setUsername(value);
        break;
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

    console.log(
      `Register submit: \nname: ${username} \nemail: ${email} \npassword: ${password}`
    );

    dispatch(
      register({
        name: username,
        email,
        password,
      })
    );

    reset();
  };

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const usernameInputId = nanoid();
  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  return (
    <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor={usernameInputId}>
        Name
        <input
          type="text"
          name="name"
          id={usernameInputId}
          onChange={handleChange}
          value={username}
        />
      </label>

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
        <button type="submit">Register</button>
        <button
          type="button"
          onClick={reset}
          disabled={!username && !email && !password}
          className={
            !username && !email && !password ? css.disabled : undefined
          }
        >
          Clear
          <ClearIcon size={24} onClick={reset} />
        </button>
      </div>
    </form>
  );
};
