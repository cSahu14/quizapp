import React from "react";
import style from "../../styles/Quiz.module.css";

const QuestionCard = ({question}) => {
    
  return (
    <div className={style.QuestionCard}>
      <div>
        <h4>{question?.question}</h4>
        {question?.options.map((option) => (
          <div>
            {question?.answers?.length === 1 ? (
              <input type="radio" name={question?.question} value={option} />
            ) : (
              <input type="checkbox" name={question?.question} value={option} />
            )}

            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
