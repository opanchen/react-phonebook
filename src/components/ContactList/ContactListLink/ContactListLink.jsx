import { Link } from "react-router-dom";
import css from "./ContactListLink.module.css";

export const ContactListLink = ({ id, name, email, phone, isFavorite }) => {
  return (
    <Link to={`/contacts/${id}`}>
      <div className={css.wrapper}>
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
    </Link>
  );
};
