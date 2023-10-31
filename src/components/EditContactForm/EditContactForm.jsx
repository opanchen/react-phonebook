import { useState } from "react";
import {
  useGetContactsQuery,
  useUpdateContactMutation,
} from "redux/contacts/contactsSlice";
import { nanoid } from "nanoid";

import { toast } from "react-toastify";
import { ClearIcon } from "helpers/icons";
import { Spinner } from "components";
import css from "./EditContactForm.module.css";

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
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

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
            pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
            title="Invalid email"
            required
            onChange={handleChange}
            value={email}
            className={css["form-input"]}
          />
        </label>

        <div className={css["buttons-bar"]}>
          <button type="submit" className={css["submit-btn"]}>
            {isUpdating ? <Spinner size={14} /> : "Save"}
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
