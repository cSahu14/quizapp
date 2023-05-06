import React, { useState } from "react";
import style from "../../styles/QuizCard.module.css";
import styled from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";

const ProfileQuiz = ({ quiz }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cookieData, setCookieData, removeCookie] = useCookies();

  const handleClick = () => {
    router.push(`/quiz/${quiz?._id}`);
  };
  const handleDelete = async (id) => {
    setLoading(true);
    if (cookieData?.userId) {
      const AuthStr = "Bearer ".concat(cookieData?.user_token);
      axios
        .delete(`https://quiz-app-aif1.onrender.com/api/quizs/${id}`, {
          headers: { Authorization: AuthStr },
        })
        .then((res) => {
          setLoading(false);
          router.reload(window.location.pathname);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <div key={quiz?._id} className={style.card}>
      <h4 className={style.title} onClick={handleClick}>
        Title - {quiz?.title}
      </h4>
      <div className={style.title} onClick={() => handleDelete(quiz?._id)}>
        Delete
      </div>
    </div>
  );
};

export default ProfileQuiz;
