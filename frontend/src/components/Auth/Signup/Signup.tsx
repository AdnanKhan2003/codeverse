import Input from "@/ui/Input/Input";

import styles from "./Signup.module.css";
import SignupForm from "./SignupForm/SignupForm";

const Signup = () => {
  
  return (
    <section className={`${styles.container__signup}`}>
      <div className={`${styles.wrapper__signup}`}>
        <h4 className={`${styles.form__title}`}>Sign Up</h4>

        <SignupForm />
          {/* <Input name="fullName" type="text" placeholder="Enter Full Name">Full Name</Input>
          <Input name="email" type="email" placeholder="Enter Email">Email</Input>
          <Input name="password" type="password" placeholder="Enter Password">Password</Input>
          <Input name="profilePic" type="file" placeholder="">Profile Picture</Input>

          <div className={`${styles.btns__form__signup__container}`}>
            <button className={`${styles.btn} ${styles.btn__signup}`}>
              Sign Up
            </button>
            <button className={`${styles.btn} ${styles.btn__guest}`}>
              Use Guest Login
            </button> */}
          {/* </div> */}
      </div>
    </section>
  );
};

export default Signup;
