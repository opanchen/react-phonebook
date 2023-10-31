import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks";
import { logout } from "redux/auth/operations";

import { LogOutIcon } from "helpers/icons";
import { AvatarForm, Modal } from "components";
import css from "./UserMenu.module.css";
import defaultAvatar from "../../assets/images/avatar-default.jpg";

export const UserMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const { user } = useAuth();

  const avatar = user.avatar.includes("www.gravatar.com/avatar/")
    ? defaultAvatar
    : user.avatar;

  const handleLogOut = () => {
    dispatch(logout());
  };

  const toggleModal = () => {
    setIsModalOpen((prevModalState) => !prevModalState);
  };

  return (
    <div className={css.wrapper}>
      <button
        type="button"
        className={css["edit-avatar-btn"]}
        onClick={toggleModal}
      >
        <div className={css.thumb}>
          <img
            src={avatar}
            className={css.avatar}
            alt="user avatar"
            width={56}
          />
        </div>
      </button>

      <div className={css.inner}>
        <p className={css.username}>{user.name ? user.name : "User"}</p>
        <button
          className={css["btn-logout"]}
          type="button"
          onClick={handleLogOut}
        >
          <span className={css["btn-label"]}>Logout</span>
          <LogOutIcon size={24} />
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <AvatarForm closeModal={toggleModal} />
        </Modal>
      )}
    </div>
  );
};
