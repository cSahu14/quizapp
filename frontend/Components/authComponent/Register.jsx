import React, { useState } from "react";
import styles from "../../styles/Auth.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


const Register = () => {
    const [cookieData, setCookieData] = useCookies()
    const router = useRouter()
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(credentials);

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post("https://quiz-app-aif1.onrender.com/api/users", credentials)
      .then((res) => {
        setCookieData("userId" , res?.data?._id)
        setCookieData("user_token", res?.data?.token)
        router.push("/")
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.lContainer}>
        <input
          type="text"
          placeholder="name"
          id="name"
          onChange={handleChange}
          className={styles.lInput}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className={styles.lInput}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className={styles.lInput}
        />
        <button onClick={handleClick} className={styles.lButton}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
