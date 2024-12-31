import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let [age, setAge] = useState(20); 

  useEffect(() => {
    count > 0 && count < 3 ? setAge(age + 1) : null; 
  }, [count]);

  return (
    <>
      <div>
        <div>안녕하십니까. 저의 나이는 {age} 입니다.</div>
        <button onClick={() => { 
          setCount(count + 1);
          }}>누르면 한 살 먹기</button>
      </div>
    </>
  )
}

export default App
