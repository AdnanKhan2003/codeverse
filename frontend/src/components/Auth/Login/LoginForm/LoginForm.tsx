"use client";

import Input from "@/ui/Input/Input";

import styles from "./LoginForm.module.css";
import { ChangeEvent, MouseEvent, useState } from "react";

const LoginForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: e.target.value,
    }));
  };

  const handleTogglePasswordView = (e: MouseEvent) => {
    console.log("gandu");
    
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form className={`${styles.form__login}`}>
      <Input
        name="email"
        onChange={(e) => handleChangeInputs(e, "email")}
        value={inputValues.email}
        type="email"
        placeholder="Enter Email"
      >
        Email
      </Input>
      <Input
        name="password"
        showPassword={showPassword}
        onClick={handleTogglePasswordView}
        onChange={(e) => handleChangeInputs(e, "password")}
        value={inputValues.password}
        type="password"
        placeholder="Enter Password"
      >
        Password
      </Input>

      <div className={`${styles.btns__form__login__container}`}>
        <button className={`${styles.btn} ${styles.btn__login}`}>
          Login In
        </button>
        <button className={`${styles.btn} ${styles.btn__guest}`}>
          Use Guest Login
        </button>
      </div>
    </form >
  );
};

export default LoginForm;
