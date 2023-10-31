import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Container, FallbackView, Spinner } from "components";
import css from "./Verify.module.css";

const Verify = () => {
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(100);

  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        return;
      }

      try {
        const res = await axios.get(
          `https://phonebook-backend-kuop.onrender.com/api/users/verify/${token}`
        );

        if (res.status === 200) {
          setVerified(true);
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.data);
      }
    };

    verifyUser();
  }, [token]);

  useEffect(() => {
    if (!verified) return;

    const interval = setInterval(() => setTimer((sec) => sec - 1), 1000);

    if (timer === 0) {
      clearInterval(interval);
      navigate("/login");
    }

    return () => clearInterval(interval);
  }, [navigate, verified, timer]);

  return (
    <Container>
      <section className={css.wrapper}>
        <h1>Verification page</h1>
        {verified ? (
          <div className={css.inner}>
            <div>
              <p className={css["message-success"]}>
                Email was verified successfully!
              </p>
              <p className={css["message-info"]}>
                Please follow the link below to complete the login process...
              </p>
            </div>

            <Link to="/login" className={css["redirect-btn"]}>
              Go to login
            </Link>

            <div className={css.timer}>
              <p>
                Auto-redirect to login page in{" "}
                <span className={css.countdown}>{timer}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className={css.fallback}>
            <FallbackView type="warning" message={"Email is not verified"} />
            <Spinner size={40} />
          </div>
        )}
      </section>
    </Container>
  );
};

export default Verify;
