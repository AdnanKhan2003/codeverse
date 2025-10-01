"use client";

import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

import { InputProps } from "@/types/input";

import styles from "./Input.module.css";

const Input = ({ children, onChange, onClick, value, showPassword, type, name, placeholder, ...props }: InputProps) => {
  if (type === "file") {
    return (
      <div className={`${styles.separator__input}`}>
        <label
          htmlFor="profilePic"
          className={`${styles.label} ${styles.label__profilePic}`}
        >
          {children}
        </label>
        <input
          {...props}
          type={type}
          name={name}
          accept="image/*"
          onChange={onChange}
          className={`${styles.input} ${styles.input__profilePic}`}
        />
      </div>
    );
  }

  if (type === "password") {
    console.log('wwww');
    
    return (
      <div className={`${styles.separator__input}`}>
        <label
          htmlFor={name}
          className={`${styles.label} ${styles.label__password}`}
        >
          {children}
        </label>
        <div className={`${styles.input__password__container}`}>
          <input
            {...props}
            type={showPassword ? "text" : "password"}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={`${styles.input} ${styles.input__password}`}
          />
          <div className={styles.icon} onClick={onClick}>
          {showPassword ? <FiEye /> : <FiEyeOff />}
          </div>
          {/* {showPassword ? <FiEye onClick={onClick} /> : <FiEyeOff onClick={onClick} />} */}
        </div>
      </div>
    );
  }

  const inputStyle = `input__${type}`;

  return (
    <div className={`${styles.separator__input}`}>
      <label
        htmlFor={name}
        className={`${styles.label} ${styles.label__password}`}
      >
        {children}
      </label>
      <input
        {...props}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`${styles.input} ${styles[inputStyle]}`}
      />
    </div>
  );
};

export default Input;
