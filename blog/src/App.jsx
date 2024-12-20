/* eslint-disable */ //lint 끄는 기능

import { useState } from 'react'
import './App.css'

function App() {

  let post = '역삼 우동 맛집'; //자료 잠깐 저장할 땐 변수 사용
  // let [title1, state1] = useState('남자 코트 추천');
  // let [title2, state2] = useState('강남 우동 맛집');
  // let [title3, state3] = useState('파이썬독학');
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState(0);
  let [modal, setModal] = useState(false);


  //자바스크립트 Destructuring 문법 : 배열 안에 있는 값을 각각 바인딩해주는 문법
  let num = [1, 2];
  let [a, c] = [1, 2];
  // let a = num[0];
  // let c = num[1];

  return (
    <div className="App">
        <div className="black-nav">
          <h4>ReactBlog</h4>
        </div>

        <button onClick = { () => {
          //let arr = [1, 2, 3]; // arr에는 [1, 2, 3]의 주소값만 저장된다.

          // let copy = 글제목; // 얕은 복사
          let copy = [...글제목]; // 깊은 복사, ...(나열 연산자)
          copy[0] = '여자 코트 추천';
          글제목변경( copy );
        } }>제목 변경 버튼</button>

        <button onClick = { () => { 
          let sort = [...글제목].sort(); //깊은 복사
          글제목변경(sort); 
         }}>
          가나다 정렬 버튼
        </button>

        <div className="list">
          <h4>{ 글제목[0] } 
            <span onClick={ () => { 따봉변경(따봉+1) } }>👍</span> {따봉} </h4>
          <p>12월 19일 발행</p> 
        </div>

        <div className="list">
          <h4>{ 글제목[1] }</h4>
          <p>12월 19일 발행</p>
        </div>  

        <div className="list">
          <h4 onClick = { () => { 
            if (modal == true) setModal(false)
            else setModal(true)
           }}>{ 글제목[2] }</h4>
          <p>12월 19일 발행</p>
        </div>          
        
        {
          //html 중간에 조건문을 쓰려면 삼항연산자로 작성해야 한다.
          modal == true ? <Modal/> : null
        }
        
       

    </div>
  )
}

function Modal() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

// const MyComponent = () => {
//   return (
//     <ul>
//       <li>이발하기</li>
//       <li>장보기</li>
//       <li>정보처리기사 복습</li>
//     </ul>
//   )
// }





export default App
