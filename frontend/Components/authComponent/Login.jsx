import React, { useState } from "react";
import styles from "../../styles/Auth.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


const Login = () => {
    const [cookieData, setCookieData] = useCookies()
    const router = useRouter()
    const [error, setError] = useState("")
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(credentials);

  const handleClick = async (e) => {
    e.preventDefault();
    const AuthStr = 'Bearer '.concat(cookieData?.user_token); 
    await axios
      .post("http://localhost:5000/api/users/login", credentials, { headers: { Authorization: AuthStr } })
      .then((res) => {
        setCookieData("userId" , res?.data?._id)
        setCookieData("user_token", res?.data?.token)
        router.push("/")
    })
    .catch((err) => {
        setError(err?.response?.data?.message)
        console.log(err);
      });
  };

  console.log("error", error)

  return (
    <div className={styles.login}>
      <div className={styles.lContainer}>
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
          Login
        </button>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default Login;
