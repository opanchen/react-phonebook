import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetContactByIdQuery,
  useUpdateStatusContactMutation,
} from "redux/contacts/contactsSlice";
import css from "./ContactDetails.module.css";
import { useEffect, useState } from "react";
import {
  AddToFavIcon,
  CallIcon,
  DeleteIcon,
  EditIcon,
  MessageIcon,
  RemoveFromFavIcon,
} from "helpers/icons";
import {
  Container,
  EditContactForm,
  FallbackView,
  MessageForm,
  Modal,
  Spinner,
} from "components";
import { useWindowDimensions } from "hooks";
import contactAvatar from "../../assets/images/contact.png";

const AVATAR_PATH = "https://cdn-icons-png.flaticon.com/512/1998/1998592.png";

const ContactDetails = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { id } = useParams();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const [toggleIsFavorite, { isLoading: isFavChangind }] =
    useUpdateStatusContactMutation();
  const { data: contact, isLoading, isError } = useGetContactByIdQuery(id);

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 768) return;

    navigate("/contacts");
  }, [navigate, width]);

  // !
  if (isError || !contact)
    return (
      <FallbackView
        type="error"
        message={
          "Something went wrong... Information about this contact isn't available. Please try again later."
        }
      />
    );

  //   console.log(contact);
  const { name, email, phone, favorite: isFavorite, sentMessages } = contact;

  const favoriteHandler = () => {
    toggleIsFavorite({ id, favorite: !isFavorite });
  };

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

  return (
    <>
      <Container>
        <section className={css.section}>
          <button
            className={css["back-btn"]}
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {isLoading && <Spinner size={32} />}
          {contact && (
            <div className={css.wrapper}>
              <div className={css.inner}>
                <div className={css.thumb}>
                  <img
                    className={css.image}
                    src={contactAvatar}
                    alt="icon"
                    width={86}
                  />
                </div>
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
                        {isFavorite
                          ? "Remove from favorite"
                          : "Add to favorite"}
                      </span>
                      {isFavorite ? (
                        <RemoveFromFavIcon
                          size={20}
                          color={"#e84a5f"}
                          className={css["icon-fav-remove"]}
                        />
                      ) : (
                        <AddToFavIcon
                          size={20}
                          className={css["icon-fav-add"]}
                        />
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
                    avatar={AVATAR_PATH}
                  />
                </Modal>
              )}

              {isMessageModalOpen && (
                <Modal onClose={toggleMessageModal}>
                  <MessageForm
                    id={id}
                    closeModal={toggleMessageModal}
                    messages={sentMessages}
                  />
                </Modal>
              )}
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default ContactDetails;
