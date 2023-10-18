import { Container, FallbackView, RegisterForm } from "components";
import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import css from "./Register.module.css";
import { useDispatch } from "react-redux";
import { resendVerifyMessage } from "redux/auth/operations";
import { Helmet } from "react-helmet";

const Register = () => {
  const { isRegistered, isVerifyMessageResended, user } = useAuth();
  // const [resendMessage, setResendMessage] = useState(false);
  const [timer, setTimer] = useState(300);
  // const [timer, setTimer] = useState(5);
  const dispatch = useDispatch();

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
        <div>
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
              <button
                className={css["resend-btn"]}
                type="button"
                onClick={resendHandler}
              >
                Resend message
              </button>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default Register;
