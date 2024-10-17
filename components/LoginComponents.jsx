import React from "react";
import styles from "./LoginComponents.module.css"; // اصلاح نام به `styles`
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const LoginComponents = () => {
  const formField = { phone_number: "", password: "" }; // استفاده از phone_number به جای username

  const submitHandler = async (values, { setErrors }) => {
    try {
      const response = await fetch("http://127.0.0.1:8001/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.phone_number,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();
      
      // در اینجا می‌توانید توکن را دریافت و ذخیره کنید
      localStorage.setItem("token", data.token);

      // بعد از ورود موفقیت‌آمیز، کاربر را به صفحه‌ی دیگر ریدایرکت کنید
      window.location.href = "/dashboard"; // آدرس صفحه مقصد

    } catch (error) {
      setErrors({ phone_number: "Invalid phone number or password" });
    }
  };

  const validationHandler = Yup.object({
    phone_number: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  });

  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={formField}
      validationSchema={validationHandler}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form className={`${styles.FormStyle}`}>
        <h2 className={`${styles.LoginLabel}`}>Login</h2>

        <Field
          name="phone_number"
          type="text"
          className={`${styles.InputStyles}`}
          placeholder="Phone Number"
        />
        <ErrorMessage
          name="phone_number"
          component="div"
          className={styles.error}
        />

        <Field
          name="password"
          type="password"
          className={`${styles.InputStyles}`}
          placeholder="Password"
        />
        <ErrorMessage
          name="password"
          component="div"
          className={styles.error}
        />

        <button type="submit" className={`${styles.ButtonStyles}`}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default LoginComponents;
