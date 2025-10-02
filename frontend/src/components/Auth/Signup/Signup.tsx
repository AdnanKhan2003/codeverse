import SignupForm from "./SignupForm/SignupForm";

import styles from "./Signup.module.css";

const Signup = () => {
  
  return (
    <section className={`${styles.container__signup}`}>
      <div className={`${styles.wrapper__signup}`}>
        <h4 className={`${styles.form__title}`}>Sign Up</h4>

        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
