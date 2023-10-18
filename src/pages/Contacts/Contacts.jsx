import { ContactForm, Container, InnerNavigation } from "components";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import css from "./Contacts.module.css";
import { Helmet } from "react-helmet";

const Contacts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location && location?.pathname === "/contacts")
      navigate("/contacts/all");
  }, [location, navigate]);

  return (
    <>
      <Helmet>
        <title>Contacts</title>
      </Helmet>

      <section>
        <Container>
          <h1 className="visually-hidden">Contacts</h1>
          <div className={css.inner}>
            <div>
              <h2 className={css["form-title"]}>Add new contact</h2>
              <ContactForm />
            </div>
            <div className={css["contacts-box"]}>
              <InnerNavigation />
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contacts;
