import React, { useState } from "react";
import styles from "../../styles/CreateQuiz.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


const CreateQuiz = () => {
    const [cookieData, setCookieData] = useCookies()
    const router = useRouter()
    const [title, setTitle] = useState(undefined)
    const [question, setQuestion] = useState(undefined)
    const [options, setOptions] = useState([])
    const [optionOne, setOptionOne] = useState(undefined)
    const [optionTwo, setOptionTwo] = useState(undefined)
    const [optionThree, setOptionThree] = useState(undefined)
    const [optionFour, setOptionFour] = useState(undefined)
    const [optionFive, setOptionFive] = useState(undefined)

    const [answerOne, setAnswerOne] = useState(undefined)
    const [answerTwo, setAnswerTwo] = useState(undefined)
    const [answerThree, setAnswerThree] = useState(undefined)
    const [answerFour, setAnswerFour] = useState(undefined)
    const [answerFive, setAnswerFive] = useState(undefined)
  const [questionArray, setQuestionArray] = useState([]);

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleQuestion = (e) => {
    setQuestion(e.target.value)
  }

  const handleOptionsOne = (e) => {
    setOptionOne(e.target.value)
  }
  const handleOptionsTwo =(e) => {
    setOptionTwo(e.target.value)
  }

  const handleOptionsThree = (e) => {
    setOptionThree(e.target.value)
  }
  const handleOptionsFour = (e) => {
    setOptionFour(e.target.value)
  }
  const handleOptionsFive = (e) => {
    setOptionFive(e.target.value)
  }

  const handleAnswerOne = (e) => {
    setAnswerOne(e.target.value)
  }

  const handleAnswerTwo = (e) => {
    setAnswerTwo(e.target.value)
  }

  const handleAnswerThree = (e) => {
    setAnswerThree(e.target.value)
  }

  const handleAnswerFour = (e) => {
    setAnswerFour(e.target.value)
  }

  const handleAnswerFive = (e) => {
    setAnswerFive(e.target.value)
  }
console.log("optionOne", optionOne)

const quizOptions = () => {
    let options = [];
    if((optionOne !== undefined) && (optionOne !== "")){
        options.push(optionOne)
    }
    if((optionTwo !== undefined) && (optionTwo !== "")){
        options.push(optionTwo)
    }
    if((optionThree !== undefined) && (optionThree !== "")){
        options.push(optionThree)
    }
    if((optionFour !== undefined) && (optionFour !== "")){
        options.push(optionFour)
    }
    if((optionFive !== undefined) && (optionFive !== "")){
        options.push(optionFive)
    }

    let answers = [];
    if((answerOne !== undefined) && (answerOne !== "")){
        answers.push(answerOne)
    }
    if((answerTwo !== undefined) && (answerTwo !== "")){
        answers.push(answerTwo)
    }
    if((answerThree !== undefined) && (answerThree !== "")){
        answers.push(answerThree)
    }
    if((answerFour !== undefined) && (answerFour !== "")){
        answers.push(answerFour)
    }
    if((answerFive !== undefined) && (answerFive !== "")){
        answers.push(answerFive)
    }

    const questions =  {
        question,
        options ,
        answers
    }
    questionArray.push(questions)
}
  const handleClick = async (e) => {

    quizOptions()
  
    e.preventDefault();
    const AuthStr = 'Bearer '.concat(cookieData?.user_token); 
    const data = {
        title ,
        questions : questionArray
    }
    console.log("data", data)
    await axios
      .post("https://quiz-app-aif1.onrender.com/api/quizs", data, { headers: { Authorization: AuthStr } })
      .then((res) => {
        console.log(res);

        setQuestion("")
        setOptionOne("")
        setOptionTwo("")
        setOptionThree("")
        setOptionFour("")
        setOptionFive("")
    
        setAnswerOne("")
        setAnswerTwo("")
        setAnswerThree("")
        setAnswerFour("")
        setAnswerFive("")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNext = () => {
    quizOptions()
    setQuestion("")
    setOptionOne("")
    setOptionTwo("")
    setOptionThree("")
    setOptionFour("")
    setOptionFive("")

    setAnswerOne("")
    setAnswerTwo("")
    setAnswerThree("")
    setAnswerFour("")
    setAnswerFive("")
  }

  console.log("questionArray", questionArray)

  return (
    <div className={styles.login}>
        <div className={styles.title}>
            <div className={styles.inputSpan}>Title</div>
            <input
            type="text"
            placeholder="Title"
            id="title"
            onChange={handleTitle}
            className={`${styles.lInput} ${styles.lTitle}`}
            />
        </div>
            <div>Question 1</div>
      <div className={styles.lContainer}>
        <div>
            <div className={styles.inputSpan}>Qustion</div>
            <input
            type="text"
            placeholder="Question"
            id="question"
            onChange={handleQuestion}
            className={`${styles.lInput} ${styles.lQuestion}`}
            value={question}
            />
        </div>
        <div>
            <div className={styles.inputSpan}>Options</div>
            <input
            type="text"
            placeholder="Options"
            id="option"
            onChange={handleOptionsOne}
            className={styles.lInput}
            value={optionOne}
            />
            <input
            type="text"
            placeholder="Options"
            id="option"
            onChange={handleOptionsTwo}
            className={styles.lInput}
            value={optionTwo}
            />
            <input
            type="text"
            placeholder="Options"
            id="option"
            onChange={handleOptionsThree}
            className={styles.lInput}
            value={optionThree}
            />
            <input
            type="text"
            placeholder="Options"
            id="option"
            onChange={handleOptionsFour}
            className={styles.lInput}
            value={optionFour}
            />
            <input
            type="text"
            placeholder="Options"
            id="option"
            onChange={handleOptionsFive}
            className={styles.lInput}
            value={optionFive}
            />
        </div>
        <div>
            <div className={styles.inputSpan}>Answers</div>
            <input
            type="text"
            placeholder="Answers"
            id="answer"
            onChange={handleAnswerOne}
            className={styles.lInput}
            value={answerOne}
            />
            <input
            type="text"
            placeholder="Answers"
            id="answer"
            onChange={handleAnswerTwo}
            className={styles.lInput}
            value={answerTwo}
            />
            <input
            type="text"
            placeholder="Answers"
            id="answer"
            onChange={handleAnswerThree}
            className={styles.lInput}
            value={answerThree}
            />
            <input
            type="text"
            placeholder="Answers"
            id="answer"
            onChange={handleAnswerFour}
            className={styles.lInput}
            value={answerFour}
            />
            <input
            type="text"
            placeholder="Answers"
            id="answer"
            onChange={handleAnswerFive}
            className={styles.lInput}
            value={answerFive}
            />
        </div>
      </div>
        <button onClick={handleNext} className={styles.lButton}>
          Next
        </button>
        <button onClick={handleClick} className={styles.lButton}>
          Submit
        </button>
    </div>
  );
};

export default CreateQuiz;
