import Input from "@/ui/Input/Input";
import LoginForm from "./LoginForm/LoginForm";

import styles from "./Login.module.css";

const Login = () => {
  return (
    <section className={`${styles.container__login}`}>
      <div className={`${styles.wrapper__login}`}>
        <h4 className={`${styles.form__title}`}>Log In</h4>

          <LoginForm />
      </div>
    </section>
  );
};

export default Login;
