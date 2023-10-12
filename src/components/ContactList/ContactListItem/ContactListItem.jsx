import { useWindowDimensions } from "hooks";
import css from "./ContactListItem.module.css";
import {
  AddToFavIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
  MessageIcon,
  RemoveFromFavIcon,
} from "helpers/icons";
import { ContactListLink } from "../ContactListLink/ContactListLink";
import { useState } from "react";
import {
  useDeleteContactMutation,
  useUpdateStatusContactMutation,
} from "redux/contacts/contactsSlice";
import { EditContactForm, Modal } from "components";

const AVATAR_PATH = "https://cdn-icons-png.flaticon.com/512/1998/1998592.png";

export const ContactListItem = ({ id, name, email, phone, isFavorite }) => {
  const { media } = useWindowDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteContact] = useDeleteContactMutation();
  const [toggleIsFavorite] = useUpdateStatusContactMutation();

  const toggleModal = () => {
    setIsModalOpen((prevModalState) => !prevModalState);
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
        <img className={css.image} src={AVATAR_PATH} alt="icon" width={48} />
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
        </button>
        <a href={`tel:${phone}`} className={css["call-btn"]}>
          <span className={css["btn-label"]}>Call</span>
          <CallIcon size={24} className={css["icon-call"]} />
        </a>
        <button className={css["message-btn"]} type="button" onClick={() => {}}>
          <span className={css["btn-label"]}>Email</span>
          <MessageIcon size={20} className={css["icon-message"]} />
        </button>
        <button type="button" className={css["edit-btn"]} onClick={toggleModal}>
          <span className={css["btn-label"]}>Edit</span>
          <EditIcon size={24} className={css["icon-edit"]} />
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
