import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../NavComponent/Navbar';
import QuizCard from '../QuizCardComponent/QuizCard';
import style from "../../styles/Home.module.css"

const HomePage = () => {
    const [quizes, setQuizes] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/quizs`).then((res) => {
            setQuizes(res?.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log("quizes", quizes)
  return (
        <main className={style.homeContainer}>
            <section className={style.quizCard}>
                { quizes?.map(quiz => (
                    <QuizCard quiz={quiz} />
                ))}
            </section>
        </main>
  )
}

export default HomePage