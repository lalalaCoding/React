/* eslint-disable */ //lint 끄는 기능
import {Component} from 'react';
import { useState } from 'react'
import './App.css'

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [발행날짜, 발행날짜변경] = useState(['12월 20일','12월 18일','12월 15일']);
  let [modal, setModal] = useState(false);
  let [choice, setChoice] = useState(0); //선택한 글 번호의 인덱스
  let [입력값, 입력값변경] = useState('');
  let [insertBtn, setInsertBtn] = useState(true);

  const getDateFormat = () => { //'MM월 dd일'
    const array = new Date().toISOString().split('T')[0].split('-'); // [YYYY, MM, dd]
    return array[1] + '월 ' + array[2] + '일';
  }


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
                <h4 onClick = { () => { setModal(!modal); setChoice(i); }}>
                  { 글제목[i] }
                  
                  <span onClick={ (e) => {
                    e.stopPropagation(); //이벤트 버블링을 막아주는 함수 
                    let 따봉복사 = [...따봉]; //원본 배열의 깊은 복사
                    따봉복사[i] += 1;
                    따봉변경(따봉복사); } }> 👍 </span> { 따봉[i] }
                </h4>

                <p>{ 발행날짜[i] } 발행</p>

                <button onClick={ () => {
                  let 글제목복사 = 글제목.slice(0, i).concat(글제목.slice(i + 1));
                  let 따봉복사 = 따봉.slice(0, i).concat(따봉.slice(i + 1));
                  
                  // let copy = [...글제목];
                  // copy.splice(i, 1);
                  // 글제목변경(copy);

                  글제목변경(글제목복사);
                  따봉변경(따봉복사);
                } }>삭제</button>
              </div>
            )
          })
        }

        <input type="text" onChange={ (e) => { 
          입력값변경(e.target.value);   
          if (e.target.value.trim().length > 0) {
            setInsertBtn(false);
          } else {
            setInsertBtn(true);
          } 
        } }/>

        <button onClick={ () => { 
          let 글제목복사 = [...글제목]; //깊은 복사
          let 따봉복사 = [...따봉];
          let 발행날짜복사 = [...발행날짜];
          
          글제목복사.unshift(입력값);
          따봉복사.unshift(0);
          발행날짜복사.unshift(getDateFormat());
          글제목변경(글제목복사);
          따봉변경(따봉복사);
          발행날짜변경(발행날짜복사);

         }} disabled={insertBtn}>글발행</button>

        {
          modal == true ? <Modal 글제목={글제목} 여자={여자} 글제목변경={글제목변경} choice={choice} /> : null
        }
        
        <Modal2/>

    </div>
  )
}


function Modal(props) {
  return (
    <div className="modal">
      <h4>{ props.글제목[props.choice] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ props.여자 } >글수정</button>
    </div>
  )
}

//클래스형 컴포넌트
class Modal2 extends Component {
  constructor(props) {
    super(props);

    //스테이트 정의
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render() {
    return (
      <div>안녕 {this.state.age}
        <button onClick={ () => {
          this.setState({age : 21}); //스테이트를 갈아치우진 않고, 변경된 부분만 수정해줌(함수형과 차이점)
        }}>버튼</button>
      </div>
    )
  }
}



export default App
