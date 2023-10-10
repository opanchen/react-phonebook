import { ContactList } from "components";
import { useGetContactsQuery } from "redux/contacts/contactsSlice";

const AllContacts = () => {
  const { data: contacts, isLoading, isError } = useGetContactsQuery();
  // console.log(contacts);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {contacts && contacts.length > 0 && <ContactList contacts={contacts} />}
    </>
  );
};

export default AllContacts;
