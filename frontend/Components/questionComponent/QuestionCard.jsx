import React, { useState } from "react";
import style from "../../styles/Quiz.module.css";

const QuestionCard = ({ question, id }) => {
  return (
    <div className={style.QuestionCard}>
      <div className={style.questionHeader}>
        <h2 className={style.question}>{question?.question}</h2>
        <ul>
          {question?.options.map((option) => (
            <li>
              {question?.answers?.length === 1 ? (
                <input type="radio" name={question?.question} value={option} />
              ) : (
                <input
                  type="checkbox"
                  name={question?.question}
                  value={option}
                />
              )}

              <label for="a">{option}</label>
            </li>
          ))}
        </ul>
      </div>
      <button className={style.button}>Next</button>
    </div>
  );
};

export default QuestionCard;
