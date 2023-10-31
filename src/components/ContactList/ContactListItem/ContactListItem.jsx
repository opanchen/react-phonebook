import { useWindowDimensions } from "hooks";
import { useState } from "react";
import {
  useDeleteContactMutation,
  useUpdateStatusContactMutation,
} from "redux/contacts/contactsSlice";

import {
  AddToFavIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
  MessageIcon,
  RemoveFromFavIcon,
} from "helpers/icons";
import {
  EditContactForm,
  MessageForm,
  Modal,
  Spinner,
  ContactListLink,
} from "components";
import css from "./ContactListItem.module.css";
import contactAvatar from "../../../assets/images/contact.png";

export const ContactListItem = ({
  id,
  name,
  email,
  phone,
  isFavorite,
  messages,
}) => {
  const { media } = useWindowDimensions();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const [toggleIsFavorite, { isLoading: isFavChangind }] =
    useUpdateStatusContactMutation();

  const toggleEditModal = () => {
    setIsEditModalOpen((prevModalState) => !prevModalState);
  };

  const toggleMessageModal = () => {
    setIsMessageModalOpen((prevModalState) => !prevModalState);
  };

  const handleDeleteContact = () => {
    console.log("Delete contact with id: ", id, "?");
    deleteContact(id);
  };

  const favoriteHandler = () => {
    toggleIsFavorite({ id, favorite: !isFavorite });
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
        <img className={css.image} src={contactAvatar} alt="icon" width={48} />
        <div className={css.info}>
          <p className={css.name}>
            <span className={css["label-name"]}>Name:</span> {name}
          </p>
          <p className={css.phone}>
            <span className={css["label-phone"]}>Phone:</span> {phone}
          </p>
          <p className={css.email}>
            <span className={css["label-email"]}>Email:</span> {email}
          </p>
        </div>
      </div>

      <div className={css["btn-bar"]}>
        <button
          className={css["fav-btn"]}
          type="button"
          onClick={favoriteHandler}
        >
          {isFavChangind ? (
            <Spinner size={14} />
          ) : (
            <>
              {" "}
              <span className={css["btn-label"]}>
                {isFavorite ? "Remove from favorite" : "Add to favorite"}
              </span>
              {isFavorite ? (
                <RemoveFromFavIcon
                  size={20}
                  color={"#e84a5f"}
                  className={css["icon-fav-remove"]}
                />
              ) : (
                <AddToFavIcon size={20} className={css["icon-fav-add"]} />
              )}
            </>
          )}
        </button>
        <a href={`tel:${phone}`} className={css["call-btn"]}>
          <span className={css["btn-label"]}>Call</span>
          <CallIcon size={24} className={css["icon-call"]} />
        </a>
        <button
          className={css["message-btn"]}
          type="button"
          onClick={toggleMessageModal}
        >
          <span className={css["btn-label"]}>Email</span>
          <MessageIcon size={20} className={css["icon-message"]} />
        </button>
        <button
          type="button"
          className={css["edit-btn"]}
          onClick={toggleEditModal}
        >
          <span className={css["btn-label"]}>Edit</span>
          <EditIcon size={24} className={css["icon-edit"]} />
        </button>
        <button
          className={css["delete-btn"]}
          type="button"
          onClick={handleDeleteContact}
        >
          {isDeleting ? (
            <Spinner size={14} />
          ) : (
            <>
              <span className={css["btn-label"]}>Delete</span>
              <DeleteIcon size={24} className={css["icon-del"]} />
            </>
          )}
        </button>
      </div>

      {isEditModalOpen && (
        <Modal onClose={toggleEditModal}>
          <EditContactForm
            id={id}
            prevName={name}
            prevNumber={phone}
            prevEmail={email}
            closeModal={toggleEditModal}
            avatar={contactAvatar}
          />
        </Modal>
      )}

      {isMessageModalOpen && (
        <Modal onClose={toggleMessageModal}>
          <MessageForm
            id={id}
            closeModal={toggleMessageModal}
            messages={messages}
          />
        </Modal>
      )}
    </div>
  );
};
