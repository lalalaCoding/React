/* eslint-disable */ //lint 끄는 기능

import { useState } from 'react'
import './App.css'

function App() {

  let post = '역삼 우동 맛집'; //자료 잠깐 저장할 땐 변수 사용
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);

  /*  배열.map(콜백함수)
    1. 배열의 길이 만큼 콜백함수 실행
    2. 콜백함수의 매개변수로 배열의 값을 전달받을 수 있다.
    3. 콜백함수의 리턴값을 새로운 배열에 저장해준다. (새로운 배열 길이 = 원본 배열 길이)
  
  [1, 2, 3].map(function(a) {
    return '123';
  })
  */

  return (
    <div className="App">
        <div className="black-nav">
          <h4>ReactBlog</h4>
        </div>

        <button onClick = { () => {         
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

        {/* <div className="list">
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
            setModal(!modal)
           }}>{ 글제목[2] }</h4>
          <p>12월 19일 발행</p>
        </div>           */}
        
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
