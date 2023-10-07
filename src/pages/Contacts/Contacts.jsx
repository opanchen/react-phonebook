import { ContactForm, Container, InnerNavigation } from "components";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Contacts = () => {
  return (
    <section>
      <Container>
        <h1>Contacts</h1>
        <div>
          <h2>Add new contact</h2>
          <ContactForm />
        </div>
        <div>
          <InnerNavigation />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </Container>
    </section>
  );
};

export default Contacts;
