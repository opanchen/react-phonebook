import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "redux/auth/operations";
import { useAuth } from "hooks";

import { FileUploader } from "components";
import css from "./AvatarForm.module.css";
import defaultAvatar from "../../assets/images/avatar-default.jpg";

export const AvatarForm = ({ closeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth();

  const dispatch = useDispatch();

  const avatar = user.avatar.includes("www.gravatar.com/avatar/")
    ? defaultAvatar
    : user.avatar;

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    dispatch(updateAvatar(formData));

    setSelectedFile("");
    closeModal();
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Edit avatar</h2>
      <div className={css.thumb}>
        <img
          src={avatar}
          className={css.avatar}
          alt="user avatar"
          width={120}
        />
      </div>
      <form
        className={css.form}
        encType="multipart/form-data"
        onSubmit={onFormSubmit}
      >
        <FileUploader onFileSelect={handleFileSelect} />

        <button
          className={
            !selectedFile
              ? `${css.disabled} ${css["submit-btn"]}`
              : css["submit-btn"]
          }
          type="submit"
          disabled={!selectedFile}
        >
          Update
        </button>
      </form>
    </div>
  );
};
