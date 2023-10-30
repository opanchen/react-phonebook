import { Container } from "components";
import { Helmet } from "react-helmet";
import heroImg from "../../assets/images/app.jpg";
import css from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Container>
        <section className={css.wrapper}>
          <div className={css.text}>
            <h1 className={css.heading}>Welcome to Phonebook Application!</h1>
            <p className={css.desc}>
              Create and manage your personal contact list, save favorite ones,
              send them messages or just do everything you want.
            </p>
          </div>

          <img src={heroImg} alt="application desktop" width={400} />
        </section>
      </Container>
    </>
  );
};

export default Home;
