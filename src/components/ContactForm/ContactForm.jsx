import { useState } from "react";
import { useAddContactMutation } from "redux/contacts/contactsSlice";
import { nanoid } from "nanoid";

import { Spinner } from "components";
import { ClearIcon } from "helpers/icons";
import { toast } from "react-toastify";
import css from "./ContactForm.module.css";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [addContact, { isLoading: isAdding }] = useAddContactMutation();

  const nameInputId = nanoid();
  const numberInputId = nanoid();
  const emailInputId = nanoid();

  const handleChange = (e) => {
    const { name: inputName, value } = e.currentTarget;

    switch (inputName) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        console.log(
          `Error: there isn't ${name} input for value ${value}. Check form markup.`
        );
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length === 0 || number.trim().length === 0) {
      toast.error("Name and number fields are required!");
    }
    console.log("name: ", name, "\nnumber: ", number);

    addContact({
      name,
      number,
      email,
    });

    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
    setEmail("");
  };

  return (
    <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
      <label className={css["form-label"]} htmlFor={nameInputId}>
        Name
        <input
          type="text"
          name="name"
          id={nameInputId}
          pattern="^[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]+(([' -][a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ ])?[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
          className={css["form-input"]}
        />
      </label>

      <label className={css["form-label"]} htmlFor={numberInputId}>
        Number
        <input
          type="tel"
          name="number"
          id={numberInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
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

      <div className={css["buttons-bar"]}>
        <button className={css["add-btn"]} type="submit">
          {isAdding ? <Spinner size={14} /> : "Add contact"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={!name && !number}
          className={
            !name && !number
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
