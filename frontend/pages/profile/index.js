import React from "react";
import Profile from "../../Components/profileComponent/Profile";
import { useCookies } from "react-cookie";

const index = () => {
  const [cookieData, setCookieData, removeCookie] = useCookies();

  return <div>{cookieData?.userId && <Profile />}</div>;
};

export default index;
