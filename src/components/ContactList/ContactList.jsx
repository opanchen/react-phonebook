import css from "./ContactList.module.css";
import { ContactListItem } from "./ContactListItem/ContactListItem";

export const ContactList = ({ contacts }) => {
  console.log(contacts);
  return (
    <ul className={css.list}>
      {contacts.map(({ _id, name, email, phone, favorite }) => {
        return (
          <li key={_id}>
            <ContactListItem
              id={_id}
              name={name}
              email={email}
              phone={phone}
              isFavorite={favorite}
            />
          </li>
        );
      })}
    </ul>
  );
};
