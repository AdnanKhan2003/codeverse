"use client";

import Input from "@/ui/Input/Input";

import styles from "./LoginForm.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { isEmail, isEmpty, minLength } from "@/lib/utils";
import { GuestLogin } from "@/types/input";
import Link from "next/link";
import { codeVerseApi } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/lib/features/auth/authSlice";

const LoginForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleFormValidation = () => {
    const { email, password } = inputValues;

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

  const handleTogglePasswordView = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleGuestLogin = () => {
    const guestCredentials: GuestLogin = {
      email: "guest@gmail.com",
      password: "guest123"
    };
    setInputValues(guestCredentials);
  };

  const handleSubmitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleFormValidation();

    if (!isValid) return;

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);


      const res = await codeVerseApi.post("/auth/login", inputValues);
      const resData = await res.data;


      if (resData?.success) {
        localStorage.setItem("accessToken", resData.data.accessToken);
        localStorage.setItem("refreshToken", resData.data.refreshToken);

        console.log("Saving token", resData.data.accessToken);

        dispatch(
          setAuth({
            accessToken: resData.data.accessToken,
            refreshToken: resData.data.refreshToken,
            user: resData.data.user
          })
        )

        router.push("/projects");
        console.log(data);

      } else {
        console.log("login failed");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Login Error: ", err.message);
      } else {
        console.log("Login Error: ", err);
      }
    }
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

      <div className={`${styles.navigate__signup__container}`}>
        <p className="navigate__signup">New User?</p>
        <span>
          <Link href="/signup" >Sign Up</Link>
        </span>
      </div>

      <div className={`${styles.btns__form__login__container}`}>
        <button className={`${styles.btn} ${styles.btn__login}`}>
          Login
        </button>
        <button onClick={handleGuestLogin} className={`${styles.btn} ${styles.btn__guest}`}>
          Use Guest Login
        </button>
      </div>
    </form >
  );
};

export default LoginForm;
