import React, { useState } from "react";
import styles from "../../styles/Auth.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


const Login = () => {
    const [cookieData, setCookieData] = useCookies()
    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    setError("")
    e.preventDefault();
    const AuthStr = 'Bearer '.concat(cookieData?.user_token); 
    setLoading(true)
    await axios
      .post("https://quiz-app-aif1.onrender.com/api/users/login", credentials, { headers: { Authorization: AuthStr } })
      .then((res) => {
        setLoading(false)
        setCookieData("userId" , res?.data?._id)
        setCookieData("user_token", res?.data?.token)
        router.push("/")
    })
    .catch((err) => {
      setLoading(false)
        setError(err?.response?.data?.message)
        console.log(err);
      });
  };

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
        {loading ? <p>...Loading</p>:<button onClick={handleClick} className={styles.lButton}>
          Login
        </button>}
        <div>{error}</div>
      </div>
    </div>
  );
};

export default Login;
