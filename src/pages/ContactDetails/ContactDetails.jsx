import { useParams } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetContactByIdQuery,
} from "redux/contacts/contactsSlice";
import css from "./ContactDetails.module.css";
import { useState } from "react";
import { CallIcon, DeleteIcon, EditIcon, MessageIcon } from "helpers/icons";
import { EditContactForm, Modal } from "components";

const AVATAR_PATH = "https://cdn-icons-png.flaticon.com/512/1998/1998592.png";

const ContactDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const [deleteContact] = useDeleteContactMutation();
  const { data: contact } = useGetContactByIdQuery(id);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!contact) return <div>There is no contact...</div>;

  //   console.log(contact);
  const { name, email, phone, favorite: isFavorite } = contact;

  const toggleModal = () => {
    setIsModalOpen((prevModalState) => !prevModalState);
  };

  const handleDeleteContact = () => {
    console.log("Delete contact with id: ", id, "?");
    deleteContact(id);
  };

  return (
    <>
      {contact && (
        <div className={css.wrapper}>
          <div className={css.inner}>
            <img
              className={css.image}
              src={AVATAR_PATH}
              alt="icon"
              width={48}
            />
            <div className={css.info}>
              <p>Name: {name}</p>
              <p>Phone: {phone}</p>
              <p>Email: {email}</p>
            </div>
          </div>

          <div className={css["btn-bar"]}>
            <button
              type="button"
              className={css["edit-btn"]}
              onClick={toggleModal}
            >
              <span className={css["btn-label"]}>Edit</span>
              <EditIcon size={24} className={css["icon-edit"]} />
            </button>
            <a href={`tel:${phone}`} className={css["call-btn"]}>
              <span className={css["btn-label"]}>Call</span>
              <CallIcon size={24} className={css["icon-call"]} />
            </a>
            <button
              className={css["message-btn"]}
              type="button"
              onClick={() => {}}
            >
              <span className={css["btn-label"]}>Email</span>
              <MessageIcon size={20} className={css["icon-message"]} />
            </button>
            <button
              className={css["delete-btn"]}
              type="button"
              onClick={handleDeleteContact}
            >
              <span className={css["btn-label"]}>Delete</span>
              <DeleteIcon size={24} className={css["icon-del"]} />
            </button>
          </div>

          {isModalOpen && (
            <Modal onClose={toggleModal}>
              <EditContactForm
                id={id}
                prevName={name}
                prevNumber={phone}
                prevEmail={email}
                closeModal={toggleModal}
                avatar={AVATAR_PATH}
              />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default ContactDetails;
