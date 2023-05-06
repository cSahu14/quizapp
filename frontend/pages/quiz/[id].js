import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Navbar from "../../Components/NavComponent/Navbar";
import style from "../../styles/Quiz.module.css";
import QuestionCard from "../../Components/questionComponent/QuestionCard";

const Quiz = () => {
  const router = useRouter();
  const quizId = router.query.id;
  const [quizData, setQuizData] = useState({});
  const [record, setRecord] = useState({})

  useEffect(() => {
    if (quizId) {
      axios
        .get(`http://localhost:5000/api/quizs/${quizId}`)
        .then((res) => {
          setQuizData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [quizId]);

  console.log(quizData);

  const handleChange = (e) => {
    console.log("e", e.target.value)
  }

  const handleSubmit = () => {};

  return (
    <div>
      <Navbar />
      <section className="">
        {quizData?.questions?.map((question, id) => (
          <div className={style.QuestionCard}>
            {console.log("id", id)}
            <div className={style.cardInner}>
                <div>No. {id + 1}</div>
                <div>

              <h4>{question?.question}</h4>
              {question?.options.map((option) => (
                <div>
                  {question?.answers?.length === 1 ? (
                    <input
                      type="radio"
                      name={question?.question}
                      value={option}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      name={question?.question}
                      value={option}
                    />
                  )}

                  <span>{option}</span>
                </div>
              ))}
                </div>
            </div>
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </section>
    </div>
  );
};

export default Quiz;
