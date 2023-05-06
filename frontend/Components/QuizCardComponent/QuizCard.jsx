import React from "react";
import style from "../../styles/QuizCard.module.css"
import styled from "../../styles/Home.module.css"
import { useRouter } from 'next/router';


const QuizCard = ({quiz}) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/quiz/${quiz?._id}`)
    }
  return (
    <div key={quiz?._id} className={style.card} onClick={handleClick}>
      <h4 className={style.title}>Title - {quiz?.title}</h4>
    </div>
  );
};

export default QuizCard;
