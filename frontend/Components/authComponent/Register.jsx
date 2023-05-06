import React, { useState } from "react";
import styles from "../../styles/Auth.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


const Register = () => {
    const [cookieData, setCookieData] = useCookies()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleClick = async (e) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(credentials?.email?.match(validRegex)){
      
      setError("")
      setLoading(true)
      e.preventDefault();
      await axios
        .post("https://quiz-app-aif1.onrender.com/api/users", credentials)
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
    }else {
      setError("Invalid Email.")
    }

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
        {loading ? <p>...Loading</p> : <button onClick={handleClick} className={styles.lButton}>
          Register
        </button>}
        {error && error}
      </div>
    </div>
  );
};

export default Register;
