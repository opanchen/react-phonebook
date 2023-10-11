import { createSelector } from "@reduxjs/toolkit";
import { ContactList, Filter } from "components";
import { useSelector } from "react-redux";
import { useGetContactsQuery } from "redux/contacts/contactsSlice";
import { selectFilterValue } from "redux/contacts/selectors";

const AllContacts = () => {
  const { data: contacts, isLoading, isError } = useGetContactsQuery();

  const selectVisibleContacts = createSelector(
    [selectFilterValue],
    (filter) => {
      const normalizedFilter = filter.toLowerCase();
      return (contacts || []).filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  );

  const visibleContacts = useSelector(selectVisibleContacts);
  // console.log(contacts);
  return (
    <>
      <Filter />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {contacts && contacts.length > 0 && (
        <ContactList contacts={visibleContacts} />
      )}
    </>
  );
};

export default AllContacts;
