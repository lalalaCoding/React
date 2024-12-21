/* eslint-disable */ //lint 끄는 기능

import { useState } from 'react'
import './App.css'

function App() {

  let post = '역삼 우동 맛집'; //자료 잠깐 저장할 땐 변수 사용
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);

  const 여자 = () => {
    let copy = [...글제목]; // 깊은 복사, ...(나열 연산자)
    copy[0] = '여자 코트 추천';
    글제목변경( copy );
  }

  return (
    <div className="App">
        <div className="black-nav">
          <h4>ReactBlog</h4>
        </div>

        <button onClick = { 여자 }>제목 변경 버튼</button>

        <button onClick = { () => { 
          let sort = [...글제목].sort(); //깊은 복사
          글제목변경(sort); 
         }}>
          가나다 정렬 버튼
        </button>
          
        {
          글제목.map(function(a, i) {
            return (
              <div className="list" key={i}>
                <h4>
                  <span onClick = { () => { setModal(!modal) }}>
                   { 글제목[i] }
                  </span>
                  
                  <span onClick={ () => { 
                    let 따봉복사 = [...따봉]; //원본 배열의 깊은 복사
                    따봉복사[i] += 1;
                    따봉변경(따봉복사); } }> 👍 </span> { 따봉[i] }
                </h4>
                <p>12월 19일 발행</p>
              </div>)
          })
        }

        {
          modal == true ? <Modal 글제목={글제목} color="yellow" 여자={여자}/> : null
        }
        
       

    </div>
  )
}


function Modal(props) {
  return (
    <div className="modal" style={{background: props.color}}>
      <h4>{props.글제목[0]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.여자}>글수정</button>
    </div>
  )
}

export default App
