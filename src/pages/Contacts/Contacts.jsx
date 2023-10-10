import { ContactForm, Container, InnerNavigation } from "components";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import css from "./Contacts.module.css";

const Contacts = () => {
  return (
    <section>
      <Container>
        <h1 className="visually-hidden">Contacts</h1>
        <div className={css.inner}>
          <div>
            <h2>Add new contact</h2>
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
  );
};

export default Contacts;
