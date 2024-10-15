import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./SinginComponents.module.css";

const SinginComponents = () => {
  const formField = { username: "", password: "", secondpassword: "" };
  const submitHandler = (value) => {
    console.log(value);
  };
  const validationHandler = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    secondpassword: Yup.string()
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
      className={`${styles.FormikStyle}`}
    >
      <Form className={`${styles.FormStyle}`}>
        <h2 className={`${styles.LoginLabel}`}>Sign in</h2>
        <Field
          name="username"
          type="text"
          className={`${styles.InputStyles}`}
          placeholder="Username"
        />
        <ErrorMessage
          name="username"
          component={() => {
            alert("error in username or password");
          }}
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
          component={() => {
            alert("error in username or password");
          }}
        />
        <Field
          name="secondpassword"
          type="password"
          className={`${styles.InputStyles}`}
          placeholder="Confirm Password"
        />
        <button type="submit" className={`${styles.ButtonStyles}`}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default SinginComponents;
