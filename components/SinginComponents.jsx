import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router"; // برای ریدایرکت در Next.js
import styles from "./SinginComponents.module.css";

const SigninComponents = () => {
  const router = useRouter(); // استفاده از useRouter برای ریدایرکت

  const formField = { phone_number: "", password: "", password2: "" };

  const submitHandler = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("http://localhost:8001/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {  // بررسی وضعیت 201
        // ریدایرکت به صفحه‌ای دیگر (مثلاً صفحه لاگین)
        router.push("/");  // یا هر صفحه‌ای که می‌خواهید
      } else if (response.status === 400) {
        // اگر خطای 400 باشد، خطاهای فرم را نمایش بده
        const errorData = await response.json();
        setErrors(errorData);
      } else {
        // اگر خطای دیگری بود، بدون استفاده از alert خطا را در کنسول نشان بده
        console.error("Registration failed!");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationHandler = Yup.object({
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
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
        <h2 className={`${styles.LoginLabel}`}>Sign in</h2>
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
        <Field
          name="password2"
          type="password"
          className={`${styles.InputStyles}`}
          placeholder="Confirm Password"
        />
        <ErrorMessage
          name="password2"
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

export default SigninComponents;
