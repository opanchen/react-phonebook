import { ContactList, Spinner } from "components";
import { useGetContactsQuery } from "redux/contacts/contactsSlice";
import css from "./FavContacts.module.css";

const FavContacts = () => {
  const { data: contacts, isLoading, isError } = useGetContactsQuery();

  const favoriteContacts = !contacts
    ? []
    : contacts.filter((item) => item.favorite === true);

  console.log(favoriteContacts);

  return (
    <section className={css.section}>
      {isLoading && <Spinner size={20} />}
      {isError && <div>Error</div>}
      {favoriteContacts.length === 0 && <div>No favorite contacts yet..</div>}
      {favoriteContacts.length > 0 && (
        <ContactList contacts={favoriteContacts} />
      )}
    </section>
  );
};

export default FavContacts;
