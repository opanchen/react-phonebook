import { useGetContactsQuery } from "redux/contacts/contactsSlice";

import { ContactList, FallbackView, Spinner } from "components";
import css from "./FavContacts.module.css";

const FavContacts = () => {
  const { data: contacts, isLoading, isError } = useGetContactsQuery();

  const favoriteContacts = !contacts
    ? []
    : contacts.filter((item) => item.favorite === true);

  return (
    <section className={css.section}>
      {isLoading && <Spinner size={20} />}
      {isError && (
        <FallbackView
          type="error"
          message={"Something went wrong... Please try again later."}
        />
      )}
      {!isError && favoriteContacts.length === 0 && (
        <FallbackView
          type="warning"
          message={"There aren't favorite contacts yet.."}
        />
      )}
      {favoriteContacts.length > 0 && (
        <ContactList contacts={favoriteContacts} />
      )}
    </section>
  );
};

export default FavContacts;
