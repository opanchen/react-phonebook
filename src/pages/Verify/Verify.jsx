import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import css from "./Verify.module.css";

const Verify = () => {
  const [verified, setVerified] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        console.log("no token from url params");
        return;
      }

      try {
        const res = await axios.get(
          `https://phonebook-backend-kuop.onrender.com/api/users/verify/${token}`
        );

        console.log(res);
        if (res.status === 200) {
          console.log("Verification result: ", res.data.message);
          setVerified(true);
          //   navigate("/login");
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.data);
      }
    };

    verifyUser();
  }, [token]);

  return (
    <section className={css.wrapper}>
      <h1>Verification page</h1>
      {verified ? (
        <div>
          <p>Email was verified successfully!</p>
          <Link to="/login">Go to login page</Link>
        </div>
      ) : (
        <div>
          <p>Email is not verified</p>
        </div>
      )}
    </section>
  );
};

export default Verify;
