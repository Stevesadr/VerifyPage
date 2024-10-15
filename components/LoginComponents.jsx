import React from "react";
import stylse from "./LoginComponents.module.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const LoginComponents = () => {
  const formField = { username: "", password: "" };
  const submitHandler = (value) => {
    console.log(value);
  };
  const validationHandler = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required").min(8),
  });

  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={formField}
      validationSchema={validationHandler}
      validateOnBlur={false}
      validateOnChange={false}
      className={`${stylse.FormikStyle}`}
    >
      <Form className={`${stylse.FormStyle}`}>
        <h2 className={`${stylse.LoginLabel}`}>Login</h2>
        <Field
          name="username"
          type="text"
          className={`${stylse.InputStyles}`}
          placeholder="Username"
        />
        <ErrorMessage
          name="username"
          component={() => {
            alert("error in username or password");
          }}
          className={stylse.error}
        />
        <Field
          name="password"
          type="password"
          className={`${stylse.InputStyles}`}
          placeholder="Password"
        />
        <ErrorMessage
          name="password"
          component={() => {
            alert("error in username or password");
          }}
        />
        <button type="submit" className={`${stylse.ButtonStyles}`}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default LoginComponents;
