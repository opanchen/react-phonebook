import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resendVerifyMessage } from "redux/auth/operations";

import { Container, FallbackView, ModalPopUp, RegisterForm } from "components";
import { Helmet } from "react-helmet";
import { InfoIcon } from "helpers/icons";
import css from "./Register.module.css";

const Register = () => {
  const { isRegistered, isVerifyMessageResended, user } = useAuth();

  const [timer, setTimer] = useState(300);
  const [isModalPopUpShown, setIsModalPopUpShown] = useState(false);

  const dispatch = useDispatch();

  const toggleModalPopUp = () => {
    setIsModalPopUpShown((prevModalState) => !prevModalState);
  };

  useEffect(() => {
    if (!isRegistered) return;

    const interval = setInterval(() => setTimer((sec) => sec - 1), 1000);

    if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRegistered, timer]);

  const resendHandler = () => {
    dispatch(resendVerifyMessage({ email: user.email }));
  };

  const minutes = Math.floor(timer / 60);
  const seconds = Math.floor(timer % 60);

  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>

      <Container>
        <section>
          <div className={css["main-wrapper"]}>
            <h1>Register page</h1>
            <RegisterForm />
          </div>

          {isRegistered && (
            <div className={css["verify-info"]}>
              <FallbackView
                type="warning"
                message={
                  "Please check out verification message on your email to continue..."
                }
              />

              {!isVerifyMessageResended && timer !== 0 && (
                <p className={css["resend-text"]}>
                  You can resend verification message in {minutes} min {seconds}{" "}
                  sec...
                </p>
              )}

              {!isVerifyMessageResended && timer === 0 && (
                <div className={css["btn-bar"]}>
                  <button
                    className={css["resend-btn"]}
                    type="button"
                    onClick={resendHandler}
                  >
                    Resend message
                  </button>

                  <button
                    type="button"
                    className={css["info-btn"]}
                    onClick={toggleModalPopUp}
                  >
                    <InfoIcon size={20} />
                  </button>
                </div>
              )}

              {isModalPopUpShown && (
                <ModalPopUp onClose={toggleModalPopUp}>
                  <div className={css["info-pop-up"]}>
                    <p>
                      The number of messages sent per day is limited by a
                      third-party service.
                    </p>
                    <p>
                      If you have any issues, please contact the{" "}
                      <a
                        href="https://www.linkedin.com/in/oleh-panchenko/"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        developer
                      </a>
                      .
                    </p>
                  </div>
                </ModalPopUp>
              )}
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default Register;
