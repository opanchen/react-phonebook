import { Container, LoginForm } from "components";
import { Helmet } from "react-helmet";
import css from "./Login.module.css";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Container>
        <section className={css.wrapper}>
          <h1>Login page</h1>
          <LoginForm />
        </section>
      </Container>
    </>
  );
};

export default Login;
