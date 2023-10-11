import { useState } from "react";
import css from "./EditContactForm.module.css";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import {
  useGetContactsQuery,
  useUpdateContactMutation,
} from "redux/contacts/contactsSlice";
import { ClearIcon } from "helpers/icons";

export const EditContactForm = ({
  id,
  prevName,
  prevNumber,
  prevEmail,
  closeModal,
  avatar,
}) => {
  const [name, setName] = useState(prevName);
  const [number, setNumber] = useState(prevNumber);
  const [email, setEmail] = useState(prevEmail);

  const { data: contacts } = useGetContactsQuery();
  //   console.log(contacts);
  const [updateContact] = useUpdateContactMutation();

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

  const checkContactName = (query) => {
    return contacts
      .filter((item) => item._id !== id)
      .some(({ name }) => name.toLowerCase() === query.toLowerCase());
  };

  const checkContactNumber = (query) => {
    return contacts
      .filter((item) => item._id !== id)
      .some(({ phone }) => phone === query);
  };

  const checkContactEmail = (query) => {
    return contacts
      .filter((item) => item._id !== id)
      .some(({ email }) => email.toLowerCase() === query.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkContactName(name)) {
      toast.error(`${name} is already in contacts.`);
      return;
    }
    if (checkContactEmail(email)) {
      toast.error(`${email} is already in contacts.`);
      return;
    }

    if (checkContactNumber(number)) {
      toast.error(`Number ${number} is already in use by another contact.`);
      return;
    }
    // we leave to user an opportunity to change name, email or phone number without default reset

    updateContact({ id, name, number, email });
    // dispatch(editContact({ id, name, number }));

    reset();
    closeModal();
  };

  const reset = () => {
    setName("");
    setNumber("");
    setEmail("");
  };

  return (
    <div className={css.wrapper}>
      <img
        src={avatar}
        className={css.avatar}
        alt="contact's avatar"
        width={80}
      />
      <form
        className={css["contact-form"]}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <p className={css["form-title"]}>Edit contact:</p>
        <label htmlFor={nameInputId}>
          Name
          <input
            type="text"
            name="name"
            id={nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
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
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={email}
          />
        </label>

        <div className={css["buttons-bar"]}>
          <button type="submit" className={css["submit-btn"]}>
            Save
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={!name && !number && !email}
            className={
              !name && !number && !email
                ? `${css.disabled} ${css["clear-btn"]}`
                : css["clear-btn"]
            }
          >
            <span className={css["clear-btn-label"]}>Clear</span>

            <ClearIcon size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};
