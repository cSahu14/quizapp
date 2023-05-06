import React from "react";
import Navbar from "../../Components/NavComponent/Navbar";
import CreateQuiz from "../../Components/createQuizComponent/CreateQuiz";
import { useCookies } from "react-cookie";

const index = () => {
  const [cookieData, setCookieData, removeCookie] = useCookies();

  return (
    <div>
      {cookieData?.userId && (
        <>
          <Navbar />
          <CreateQuiz />
        </>
      )}
    </div>
  );
};

export default index;
