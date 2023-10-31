import { ContactListItem } from "./ContactListItem/ContactListItem";
import css from "./ContactList.module.css";

export const ContactList = ({ contacts }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ _id, name, email, phone, favorite, sentMessages }) => {
        return (
          <li key={_id}>
            <ContactListItem
              id={_id}
              name={name}
              email={email}
              phone={phone}
              isFavorite={favorite}
              messages={sentMessages}
            />
          </li>
        );
      })}
    </ul>
  );
};
