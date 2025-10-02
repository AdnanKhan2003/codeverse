"use client";

import Input from "@/ui/Input/Input";

import styles from "./LoginForm.module.css";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { isEmail, isEmpty, minLength } from "@/lib/utils";

const LoginForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [ inputErrors, setInputErrors ] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleFormValidation = () => {
    const { email, password } = inputErrors;

    const errorsInput = {
      fullName: "",
      email: "",
      password: "",
      profilePic: "",
    };

    let isValid = true;


    if (!isEmail(email) || isEmpty(email)) {
      errorsInput.email = "Invalid or Empty Email";
      console.log("q nhi detect");
      
      isValid = false;
    }

    if (!minLength(password, 6) || isEmpty(password)) {
      errorsInput.password = "Invalid or Empty Password";
      isValid = false;
    }

    setInputErrors(errorsInput);
    return isValid;
  };

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setInputErrors(prevInputs => ({ ...prevInputs, [id]: "" }))
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: e.target.value,
    }));
  };

  const handleTogglePasswordView = (e: MouseEvent<HTMLDivElement>) => {   
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmitLoginForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleFormValidation();

    if(!isValid) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    
  };

  return (
    <form onSubmit={handleSubmitLoginForm} className={`${styles.form__login}`} noValidate>
      <Input
        name="email"
        onChange={(e) => handleChangeInputs(e, "email")}
        value={inputValues.email}
        type="email"
        inputErrors={inputErrors}
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
        inputErrors={inputErrors}
        type="password"
        placeholder="Enter Password"
      >
        Password
      </Input>

      <div className={`${styles.btns__form__login__container}`}>
        <button className={`${styles.btn} ${styles.btn__login}`}>
          Login
        </button>
        <button className={`${styles.btn} ${styles.btn__guest}`}>
          Use Guest Login
        </button>
      </div>
    </form >
  );
};

export default LoginForm;
