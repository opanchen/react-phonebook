import { useState } from "react";
import css from "./AvatarForm.module.css";
import { FileUploader } from "components";
import { useDispatch } from "react-redux";
import { updateAvatar } from "redux/auth/operations";
import { useAuth } from "hooks";
import defaultAvatar from "../../assets/images/avatar-default.jpg";

export const AvatarForm = ({ closeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const avatar = user.avatar.includes("www.gravatar.com/avatar/")
    ? defaultAvatar
    : user.avatar;

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // console.log("selected to fd: ", selectedFile);
    formData.append("avatar", selectedFile);

    // console.log(formData.get("avatar"));
    dispatch(updateAvatar(formData));

    // await setTimeout(console.log("Form data: ", formData), 1000);
    // await console.dir("Form data: ", formData);

    setSelectedFile("");
    closeModal();
  };

  const handleFileSelect = (file) => {
    // console.log("file: ", file);
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
