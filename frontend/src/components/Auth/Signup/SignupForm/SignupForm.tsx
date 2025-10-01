"use client";

import Input from "@/ui/Input/Input";

import styles from "./SignupForm.module.css";

const SignupForm = () => {
  return (
    <form className={`${styles.form__signup}`}>
      <Input name="fullName" type="text" placeholder="Enter Full Name">
        Full Name
      </Input>
      <Input name="email" type="email" placeholder="Enter Email">
        Email
      </Input>
      <Input name="password" type="password" placeholder="Enter Password">
        Password
      </Input>
      <Input name="profilePic" type="file" placeholder="">
        Profile Picture
      </Input>

      <div className={`${styles.btns__form__signup__container}`}>
        <button className={`${styles.btn} ${styles.btn__signup}`}>
          Sign Up
        </button>
        <button className={`${styles.btn} ${styles.btn__guest}`}>
          Use Guest Login
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
