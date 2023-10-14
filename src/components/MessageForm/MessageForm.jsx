import { useSendEmailMutation } from "redux/contacts/contactsSlice";
import css from "./MessageForm.module.css";
import { useState } from "react";
import { ClearIcon, InfoIcon } from "helpers/icons";
import { ModalPopUp } from "components";

export const MessageForm = ({ id, closeModal, messages }) => {
  const [sendEmail] = useSendEmailMutation();
  const [message, setMessage] = useState("");
  const [isModalPopUpShown, setIsModalPopUpShown] = useState(false);

  const toggleModalPopUp = () => {
    setIsModalPopUpShown((prevModalState) => !prevModalState);
  };

  const handleChange = (e) => {
    setMessage(e.currentTarget.value);
  };

  const reset = () => {
    setMessage("");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim().length === 0) {
      console.log("No message.");
      return;
    }

    sendEmail({ id, message });
    reset();
    // closeModal();
  };

  return (
    <div className={css.wrapper}>
      <div>
        <h3 className={css.heading}>Your sent messages</h3>
        <ul className={css.list}>
          {messages.map(({ message, _id, date }) => {
            console.log(date);
            return (
              <li key={_id} className={css.item}>
                <p className={css["message-text"]}>{message}</p>
                <p className={css["message-date"]}>{date}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <form className={css.form} onSubmit={handleSendMessage}>
        <label className={css["input-label"]}>
          New message
          <input
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
          />
          <button
            type="button"
            className={css["info-btn"]}
            onClick={toggleModalPopUp}
          >
            <InfoIcon size={20} />
          </button>
        </label>

        <div className={css["btn-bar"]}>
          <button type="submit" className={css["submit-btn"]}>
            Send
          </button>

          <button
            type="button"
            onClick={reset}
            disabled={!message}
            className={
              !message
                ? `${css.disabled} ${css["clear-btn"]}`
                : css["clear-btn"]
            }
          >
            <span className={css["clear-btn-label"]}>Clear</span>

            <ClearIcon size={24} />
          </button>
        </div>
      </form>

      {isModalPopUpShown && (
        <ModalPopUp onClose={toggleModalPopUp}>
          <div className={css["info-pop-up"]}>
            <p>
              Your message will be sent to this contact's email via a{" "}
              <b>one-way communication channel</b>.
            </p>
            <p>
              The number of messages sent per day is limited by a third-party
              service.
            </p>
          </div>
        </ModalPopUp>
      )}
    </div>
  );
};
