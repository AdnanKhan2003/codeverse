"use client";

import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";

import Input from "@/ui/Input/Input";

import styles from "./SignupForm.module.css";
import { codeVerseApi } from "@/lib/axios";
import { isEmail, isEmpty, minLength } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setAuth } from "@/lib/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupInputs, setSignupInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePic: null as File | null,
  });
  const [inputErrors, setInputErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleTogglePasswordView = (e: MouseEvent<HTMLDivElement>) => {
    console.log("eye");

    setShowPassword((prevState) => !prevState);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setInputErrors((prevInputs) => ({ ...prevInputs, [id]: "" }));

    if (id === "file") {
      const { files } = e.target;
      if (files && files.length > 0) {
        setSignupInputs((prevInputs) => ({
          ...prevInputs,
          [id]: files[0],
        }));
      }
      return;
    }

    setSignupInputs((prevInputs) => ({ ...prevInputs, [id]: e.target.value }));
  };

  const handleFormValidation = () => {
    const { fullName, email, password, profilePic } = signupInputs;

    const errorsInput = {
      fullName: "",
      email: "",
      password: "",
      profilePic: "",
    };

    let isValid = true;

    if (isEmpty(fullName) || !minLength(fullName, 4)) {
      errorsInput.fullName = "Full name must have atleast 4 characters";
      isValid = false;
    }

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

  const handleSubmitSignupForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("mai hu don");

    const isValid = handleFormValidation();

    if (!isValid) return;

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      console.log("signup", data);

      const res = await codeVerseApi.post("/auth/signup", signupInputs);
      const resData = await res.data;

      if (resData?.success) {
        localStorage.setItem("accessToken", resData.data.accessToken);
        localStorage.setItem("refreshToken", resData.data.refreshToken);

        dispatch(
          setAuth({
            accessToken: resData.data.accessToken,
            refreshToken: resData.data.refreshToken,
          })
        )
  

        router.push("/projects");
        console.log(resData);
      } else {
        console.log("failed signup");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Signup Error: ", err.message);
      } else {
        console.log("Signup Error", err);
        
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmitSignupForm}
      className={`${styles.form__signup}`}
      noValidate
    >
      <Input
        onChange={handleChangeInput}
        value={signupInputs.fullName}
        name="fullName"
        type="text"
        placeholder="Enter Full Name"
        inputErrors={inputErrors}
      >
        Full Name
      </Input>
      <Input
        onChange={handleChangeInput}
        value={signupInputs.email}
        name="email"
        type="email"
        placeholder="Enter Email"
        inputErrors={inputErrors}
      >
        Email
      </Input>
      <Input
        onChange={handleChangeInput}
        value={signupInputs.password}
        name="password"
        type="password"
        onClick={handleTogglePasswordView}
        showPassword={showPassword}
        placeholder="Enter Password"
        inputErrors={inputErrors}
      >
        Password
      </Input>
      <Input
        onChange={handleChangeInput}
        value={signupInputs.profilePic?.name || ""}
        name="profilePic"
        type="file"
        inputErrors={inputErrors}
        placeholder=""
      >
        Profile Picture
      </Input>

      <div className={`${styles.navigate__signup__container}`}>
        <p className="navigate__signup">Already Registered?</p>
        <span>
          <Link href="/login">Login</Link>
        </span>
      </div>

      <div className={`${styles.btns__form__signup__container}`}>
        <button className={`${styles.btn} ${styles.btn__signup}`}>
          Sign Up
        </button>
        <Link href="/login" className={`${styles.btn} ${styles.btn__guest}`}>
          Use Guest Login
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
