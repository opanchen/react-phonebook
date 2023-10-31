import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "redux/auth/operations";
import { nanoid } from "nanoid";

import { ClearIcon } from "helpers/icons";
import css from "./RegisterForm.module.css";

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
      <label className={css["form-label"]} htmlFor={usernameInputId}>
        Name
        <input
          type="text"
          name="name"
          required
          pattern="^[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]+(([' -][a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ ])?[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          id={usernameInputId}
          onChange={handleChange}
          value={username}
          className={css["form-input"]}
        />
      </label>

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
          Register
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={!username && !email && !password}
          className={
            !username && !email && !password
              ? `${css.disabled} ${css["clear-btn"]}`
              : css["clear-btn"]
          }
        >
          <span className={css["clear-btn-label"]}>Clear</span>
          <ClearIcon size={24} onClick={reset} />
        </button>
      </div>
    </form>
  );
};
