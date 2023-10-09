import { useState } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import { ClearIcon } from "helpers/icons";
import { toast } from "react-toastify";
import { useAddContactMutation } from "redux/contacts/contactsSlice";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addContact, res] = useAddContactMutation();

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
      <label htmlFor={nameInputId}>
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
        />
      </label>

      <label htmlFor={numberInputId}>
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

      <div className={css["buttons-bar"]}>
        <button type="submit">Add contact</button>
        <button
          type="button"
          onClick={reset}
          disabled={!name && !number}
          className={!name && !number ? css.disabled : undefined}
        >
          Clear
          <ClearIcon size={24} />
        </button>
      </div>
    </form>
  );
};
