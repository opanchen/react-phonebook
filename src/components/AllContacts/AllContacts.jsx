import { createSelector } from "@reduxjs/toolkit";
import { ContactList, FallbackView, Filter, Spinner } from "components";
import { useSelector } from "react-redux";
import { useGetContactsQuery } from "redux/contacts/contactsSlice";
import { selectFilterValue } from "redux/contacts/selectors";
import css from "./AllContacts.module.css";

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
    <section className={css.section}>
      <Filter />
      {isLoading && <Spinner size={20} />}

      {isError && (
        <FallbackView
          type="error"
          message={"Something went wrong... Please try again later."}
        />
      )}

      {!isError && contacts?.length === 0 && (
        <FallbackView
          type="warning"
          message={"Your phonebook is empty. There aren't any contacts yet.."}
        />
      )}

      {contacts?.length > 0 && visibleContacts?.length === 0 && (
        <FallbackView
          type="warning"
          message={"Contacts with this name weren't found."}
        />
      )}

      {contacts && contacts.length > 0 && (
        <ContactList contacts={visibleContacts} />
      )}
    </section>
  );
};

export default AllContacts;
