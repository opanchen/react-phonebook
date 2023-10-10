import { useWindowDimensions } from "hooks";
import css from "./ContactListItem.module.css";
import { Link } from "react-router-dom";
import { CallIcon, DeleteIcon, EditIcon, MessageIcon } from "helpers/icons";
import { ContactListLink } from "../ContactListLink/ContactListLink";

export const ContactListItem = ({ id, name, email, phone, isFavorite }) => {
  const { media } = useWindowDimensions();

  return media === "mobile" || media === "mobile-up" ? (
    <ContactListLink
      id={id}
      name={name}
      email={email}
      phone={phone}
      isFavorite={isFavorite}
    />
  ) : (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <img
          className={css.image}
          src="https://cdn-icons-png.flaticon.com/512/1998/1998592.png"
          alt="icon"
          width={48}
        />
        <div className={css.info}>
          <p>Name: {name}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </div>
      </div>

      <div className={css["btn-bar"]}>
        <button type="button" className={css["edit-btn"]} onClick={() => {}}>
          <span className={css["btn-label"]}>Edit</span>
          <EditIcon size={24} className={css["icon-edit"]} />
        </button>
        <a href={`tel:${phone}`} className={css["call-btn"]}>
          <span className={css["btn-label"]}>Call</span>
          <CallIcon size={24} className={css["icon-call"]} />
        </a>
        <button className={css["message-btn"]} type="button" onClick={() => {}}>
          <span className={css["btn-label"]}>Email</span>
          <MessageIcon size={20} className={css["icon-message"]} />
        </button>
        <button className={css["delete-btn"]} type="button" onClick={() => {}}>
          <span className={css["btn-label"]}>Delete</span>
          <DeleteIcon size={24} className={css["icon-del"]} />
        </button>
      </div>
    </div>
  );
};
