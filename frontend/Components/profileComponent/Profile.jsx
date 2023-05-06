import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "../NavComponent/Navbar";
import QuizCard from "../QuizCardComponent/QuizCard";
import style from "../../styles/Home.module.css";
import ProfileQuiz from "../QuizCardComponent/ProfileQuiz";

const Profile = () => {
  const [quizData, setQuizData] = useState([]);
  const [cookieData, setCookieData, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);

  const getQuizes = async () => {
    if (cookieData?.userId) {
      const AuthStr = "Bearer ".concat(cookieData?.user_token);
      setLoading(true);
      await axios
        .get(`https://quiz-app-aif1.onrender.com/api/quizs/quiz`, {
          headers: { Authorization: AuthStr },
        })
        .then((res) => {
          setQuizData(res?.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getQuizes();
  }, []);
  return (
    <div>
      <Navbar />
      {loading ? (
        <p>...Loading</p>
      ) : (
        <section className={style.quizCard}>
          {quizData?.length === 0 ? <h2>Please Create Your Quiz</h2> : <h2>All Quizes</h2>}
          {quizData?.map((quiz) => (
            <ProfileQuiz quiz={quiz} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Profile;
