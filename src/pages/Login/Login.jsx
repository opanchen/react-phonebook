import { Container, LoginForm } from "components";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Container>
        <div>
          <h1>Login page</h1>
          <LoginForm />
        </div>
      </Container>
    </>
  );
};

export default Login;
