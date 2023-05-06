import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useCookies } from "react-cookie";


const Profile = () => {
    const [quizData, setQuizData] = useState([])
    const [cookieData, setCookieData, removeCookie] = useCookies();

    const getQuizes = async () => {
        if(cookieData?.userId){
            const AuthStr = 'Bearer '.concat(cookieData?.user_token); 
    
          await axios.get(`http://localhost:5000/api/quizs/quiz`,  { headers: { Authorization: AuthStr } })
                .then((res) => {
                    setQuizData(res?.data)
                })
                .catch((error) => {
                  console.log(error)
                })
           }
      }
      useEffect(() => {
        getQuizes()
        console.log("quizData", quizData)
      }, [])
  return (
    <div>Profile</div>
  )
}

export default Profile