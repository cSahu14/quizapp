import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Navbar from "../../Components/NavComponent/Navbar";
import style from "../../styles/Quiz.module.css";
import QuestionCard from "../../Components/questionComponent/QuestionCard";
import Result from "../../Components/result/Result";

const Quiz = () => {
  const router = useRouter();
  const quizId = router.query.id;
  const [quizData, setQuizData] = useState({});
  const [qesNum, setQusNum] = useState(0);
  const [singleAns, setSingleAns] = useState(undefined);
  const [multiAns, setMultiAns] = useState([]);
  const [ans, setAns] = useState([]);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (quizId) {
      axios
        .get(`https://quiz-app-aif1.onrender.com/api/quizs/${quizId}`)
        .then((res) => {
          setQuizData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [quizId]);

  const handleChange = (e) => {
    setWarning(false);
    setSingleAns(e.target.value);
  };

  const handleSubmit = () => {};

  const handleNext = () => {
    if (singleAns) {
      setQusNum((prev) => prev + 1);
      const value = quizData?.questions[qesNum]?.answers.includes(singleAns);
      setAns((prev) => [...prev, value]);
      setSingleAns(undefined);
    } else if (multiAns) {
      setQusNum((prev) => prev + 1);
      let ans;
      for (let i = 0; i < quizData?.questions[qesNum]?.answers?.length; i++) {
        ans = quizData?.questions[qesNum]?.answers.includes(multiAns[i]);
        if (ans === false) {
          setAns((prev) => [...prev, ans]);
          return;
        }
      }
      setAns((prev) => [...prev, ans]);
    } else {
      setWarning(true);
    }
  };


  const handleCheckbox = (e) => {
    let value = e.target.value;
    let ansValue = multiAns.includes(value);
    if (ansValue) {
      var index = multiAns.indexOf(value);
      if (index !== -1) {
        multiAns.splice(index, 1);
      }
    } else {
      multiAns.push(value);
    }
  };

  return (
    <div>
      <Navbar />
      {qesNum + 1 <= quizData?.questions?.length ? <section className={style.questionSection}>
        {quizData?.questions?.map((question, id) => (
          <>
            {qesNum === id && (
              <div className={style.QuestionCard}>
                <div className={style.questionHeader}>
                  <h2 className={style.question}>{question?.question}</h2>
                  <ul>
                    {question?.options.map((option) => (
                      <li>
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
                            onChange={handleCheckbox}
                          />
                        )}

                        <label for="a">{option}</label>
                      </li>
                    ))}
                  </ul>
                </div>
                {quizData?.questions?.length > id + 1 ? (
                  <button className={style.button} onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button className={style.button} onClick={handleNext}>
                    Result
                  </button>
                )}
              </div>
            )}
          </>
        ))}
        {warning && <p>Please Select any Options</p>}
      </section>
    : <Result ans={ans} total={quizData?.questions?.length}/> 
    }
    </div>
  );
};

export default Quiz;
