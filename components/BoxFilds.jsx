import React, { useState } from "react";
import styles from "./BoxFilds.module.css";
import LoginComponents from "./LoginComponents";
import SinginComponents from "./SinginComponents";

const BoxFilds = () => {
  const [changePage, setChangePage] = useState(true);
  const changeLoginPageHandler = () => {
    setChangePage(false);
  };
  const changeSinginPageHandler = () => {
    setChangePage(true);
  };
  return (
    <div
      className={
        changePage == true
          ? `${styles.mainBoxFild}`
          : `${styles.mainBoxFild_Singin}`
      }
    >
      <div className={`${styles.labels_Div}`}>
        <label
          className={
            changePage === false ? styles.active_Label : styles.labels_Label
          }
          onClick={changeSinginPageHandler}
        >
          Login
        </label>
        <label
          className={
            changePage === true
              ? `${styles.active_Label}`
              : `${styles.labels_Label}`
          }
          onClick={changeLoginPageHandler}
        >
          {" "}
          Sign in
        </label>
      </div>
      <div
        className={
          changePage == true
            ? `${styles.Login_BoxFild}`
            : `${styles.Login_BoxFild_Disable}`
        }
      >
        <LoginComponents />
      </div>
      <div
        className={
          changePage == false
            ? `${styles.Singin_BoxFild}`
            : `${styles.Singin_BoxFild_Disabel}`
        }
      >
        <SinginComponents />
      </div>
    </div>
  );
};

export default BoxFilds;
