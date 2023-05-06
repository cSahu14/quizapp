import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../NavComponent/Navbar';
import QuizCard from '../QuizCardComponent/QuizCard';
import style from "../../styles/Home.module.css"

const HomePage = () => {
    const [quizes, setQuizes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       getQuizes()
    }, [])

    const getQuizes = async () => {
        setLoading(true)
       await axios.get(`https://quiz-app-aif1.onrender.com/api/quizs`).then((res) => {
            setQuizes(res?.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }
  return (
        <main className={style.homeContainer}>
            {loading ? <p>...Loading</p> : <section className={style.quizCard}>
            {quizes?.length > 1 ?
                <h2 style={{"color" : "black"}}>All Published Quizes</h2> : 
                <h2 style={{"color" : "black"}}>Please Create Quizes</h2>
}
                { quizes?.map(quiz => (
                    <QuizCard quiz={quiz} />
                ))}
            </section>}
        </main>
  )
}

export default HomePage