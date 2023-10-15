import { LogOutIcon } from "helpers/icons";
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
import { logout } from "redux/auth/operations";
import { useAuth } from "hooks";
import { AvatarForm, Modal } from "components";
import { useState } from "react";

export const UserMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useAuth();
  //   console.log(user);

  const handleLogOut = () => {
    console.log("click on log out...");
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
            src={user.avatar}
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
