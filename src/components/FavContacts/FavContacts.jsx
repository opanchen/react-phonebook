import { ContactList } from "components";
import { useGetContactsQuery } from "redux/contacts/contactsSlice";

const FavContacts = () => {
  const { data: contacts } = useGetContactsQuery();

  const favoriteContacts = !contacts
    ? []
    : contacts.filter((item) => item.favorite === true);

  console.log(favoriteContacts);

  return (
    <>
      {favoriteContacts.length === 0 && <div>No favorite contacts yet..</div>}
      {favoriteContacts.length > 0 && (
        <ContactList contacts={favoriteContacts} />
      )}
    </>
  );
};

export default FavContacts;
