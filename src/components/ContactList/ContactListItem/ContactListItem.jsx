import { useWindowDimensions } from "hooks";
import css from "./ContactListItem.module.css";
import { CallIcon, DeleteIcon, EditIcon, MessageIcon } from "helpers/icons";
import { ContactListLink } from "../ContactListLink/ContactListLink";
import { useState } from "react";
import { useDeleteContactMutation } from "redux/contacts/contactsSlice";
import { EditContactForm, Modal } from "components";

const AVATAR_PATH = "https://cdn-icons-png.flaticon.com/512/1998/1998592.png";

export const ContactListItem = ({ id, name, email, phone, isFavorite }) => {
  const { media } = useWindowDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteContact] = useDeleteContactMutation();

  const toggleModal = () => {
    setIsModalOpen((prevModalState) => !prevModalState);
  };

  const handleDeleteContact = () => {
    console.log("Delete contact with id: ", id, "?");
    deleteContact(id);
  };

  return media === "mobile" || media === "mobile-up" ? (
    <ContactListLink
      id={id}
      name={name}
      email={email}
      phone={phone}
      isFavorite={isFavorite}
    />
  ) : (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <img className={css.image} src={AVATAR_PATH} alt="icon" width={48} />
        <div className={css.info}>
          <p>Name: {name}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </div>
      </div>

      <div className={css["btn-bar"]}>
        <button type="button" className={css["edit-btn"]} onClick={toggleModal}>
          <span className={css["btn-label"]}>Edit</span>
          <EditIcon size={24} className={css["icon-edit"]} />
        </button>
        <a href={`tel:${phone}`} className={css["call-btn"]}>
          <span className={css["btn-label"]}>Call</span>
          <CallIcon size={24} className={css["icon-call"]} />
        </a>
        <button className={css["message-btn"]} type="button" onClick={() => {}}>
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
  );
};
