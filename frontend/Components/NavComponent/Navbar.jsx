import React, { useEffect, useState } from "react";
import Styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios"

const Navbar = () => {
  const [cookieData, setCookieData, removeCookie] = useCookies();
  const [userData, setUserData] = useState({})
  const router = useRouter();
  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login")
  }

  const getUser = async () => {
    if(cookieData?.userId){
        const AuthStr = 'Bearer '.concat(cookieData?.user_token); 

      await axios.get(`https://quiz-app-aif1.onrender.com/api/users/me`,  { headers: { Authorization: AuthStr } })
            .then((res) => {
              setUserData(res?.data)
            })
            .catch((error) => {
              console.log(error)
            })
       }
  }
  useEffect(() => {
   getUser()
  }, [])

  const handleLogout = () => {
     removeCookie("user_token", { path: "/" });
     removeCookie("userId", { path: "/" });
     router.push("/")
  }

  const handleCreate = () => {
    router.push("/createQuiz")
  }

console.log(userData)
  return (
    <div className={Styles.navbar}>
      <div className={Styles.navContainer}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className={Styles.logo}>Quiz App</span>
        </Link>
        {!cookieData?.userId ? (
          <div className={Styles.navItems}>
            <button className={Styles.navButton} onClick={handleRegister}>
              Register
            </button>
            <button className={Styles.navButton} onClick={handleLogin}>
              Login
            </button>
          </div>
        ) : ( <div className={Styles.navItems}>
            <button className={Styles.navButton} onClick={handleCreate}>
              Create Quiz
            </button>
            <span style={{"marginLeft" : "10px"}}>{userData?.name}</span>
            <button className={Styles.navButton} onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
