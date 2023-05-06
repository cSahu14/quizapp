import React, {useEffect, useState} from 'react'

const Result = ({ans, total}) => {
    const [totalCorrect, setTotalCorrect] = useState(0);
    useEffect(() => {
      for(let i = 0; i < ans.length ; i++){
        if(ans[i] === true){
            setTotalCorrect(prev => prev + 1)
        }
      }
    }, [])
    
  return (
    <div style={{"height" : "100vh","display" : "flex", justifyContent : 'center', alignItems : "center"}}>
       You answered {totalCorrect}/ {total} questions correctly 
    </div>
  )
}

export default Result