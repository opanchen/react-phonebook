import { Link } from "react-router-dom";
import css from "./ContactListLink.module.css";

export const ContactListLink = ({ id, name, email, phone, isFavorite }) => {
  return (
    <Link to={`/contacts/${id}`} className={css.link}>
      <div className={css.wrapper}>
        <img
          className={css.image}
          src="https://cdn-icons-png.flaticon.com/512/1998/1998592.png"
          alt="icon"
          width={48}
        />
        <div className={css.info}>
          <p className={css.name}>
            <span className={`${css["label-name"]} visually-hidden`}>
              Name:
            </span>{" "}
            {name}
          </p>
          <p className={css.phone}>
            <span className={`${css["label-phone"]} visually-hidden`}>
              Phone:
            </span>{" "}
            {phone}
          </p>
          <p className={css.email}>
            <span className={`${css["label-email"]} visually-hidden`}>
              Email:
            </span>{" "}
            {email}
          </p>
        </div>
      </div>
    </Link>
  );
};
