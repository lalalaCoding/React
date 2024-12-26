import { useState } from 'react'
import styles from './App.module.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
//import 작명 from '이미지경로';
import bg from './img/bg2.gif';
import {data, imgPath} from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Product_Detail from './routes/detail.jsx'
import { ShopEvent, FirstEvent, BirthEvent } from './routes/event.jsx';
import axios from 'axios';


function App() {
  
  let [shoes, setShoes] = useState(data); //객체 배열
  let [isLoading, setIsLoading] = useState(false);
  let [clickCount, setClickCount] = useState(0);
  let shoes_count_arr = [];
  for (let i = 0; i < shoes.length / 3; i++) {
    shoes_count_arr.push(i);
  }

  let [item_image, setItem_image] = useState(imgPath); //배열
  let navigate = useNavigate(); //Hook, 페이지 이동을 도와줌

  const change_shoes = (value) => {
    setShoes(value);
  }
  const change_item_image = (value) => {
    setItem_image(value);
  }
  const change_isLoading = (value) => {
    setIsLoading(value);
  }
  const change_clickCount = (value) => {
    setClickCount(value);
  }

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/')}}>React Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/product') }}>Product</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link href="#MyInfo">MyInfo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage shoes={shoes} change_shoes={change_shoes} 
                                            item_image={item_image} change_item_image={change_item_image} 
                                            navigate={navigate} shoes_count_arr={shoes_count_arr}
                                            isLoading={isLoading} change_isLoading={change_isLoading}
                                            clickCount={clickCount} change_clickCount={change_clickCount}/>} />
        
        <Route path="/detail/:id" element={<Product_Detail shoes={shoes} item_image={item_image}/>} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치임</div>}/>
        </Route>

        <Route path="/event" element={ <ShopEvent /> }>
          <Route path="one" element={ <FirstEvent /> } />
          <Route path="two" element={ <BirthEvent /> }/>
        </Route>

        <Route path="*" element={<div>없는페이지요</div>}/>
      </Routes>

    </div>    
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}


//메인 페이지 컴포넌트
function MainPage(props) {
  console.log(props.shoes_count_arr)
  return (
    <>
      <div className={styles['main-bg']} style={{backgroundImage : 'url(' + bg + ')'}}></div>
      { 
        props.isLoading == true ?
          <div className={styles.loading}>로딩 중 입니다.</div>
          : null
      }
      <Container>
        {   
            props.shoes_count_arr.map((a, i) => {
              return (
                <Row>
                  { //상품 목록 출력
                    props.shoes.map(function(item, index) {
                      
                      return (
                        (i*3 <= index) && (index < (i*3+3)) ?
                      <Product select_item={props.shoes[index]} select_img={props.item_image[index]} index={index} navigate={props.navigate} key={index}/>
                        : null
                    )
                    })
                  }
                </Row>
              )
            })
        }      
      </Container>

      <Button variant='warning' onClick={ () => { 
        let shoes_copy = [...props.shoes];
        shoes_copy.sort((a, b) => {
          return a.title.localeCompare(b.title); //상품명 오름차순 정렬
        });
        props.change_shoes(shoes_copy);
        
        let image_copy = [];
        for (let s of shoes_copy) {
          let shoe_id = s.id;
          for (let i of props.item_image) {
              if(i.includes('shoes' + (shoe_id + 1) + '.jpg')) image_copy.push(i);
          }
        }
        props.change_item_image(image_copy);

       }}>상품 정렬</Button>
      
      {/* 버튼 2회 누르면 다음 상품 목록 추가하기, 
          버튼 3회 누르면 상품 없음 알림 출력,
          버튼 누르면 '로딩 중입니다' 알림 출력하기 */}
      <Button onClick={() => {
        props.change_isLoading(true); //로딩 중 UI 띄우기
        
        console.log('클릭 카운트 = ' + props.clickCount);
        console.log('http://codingapple1.github.io/shop/data' + (props.clickCount + 2) + '.json')

        if (props.clickCount < 2) {
          // 서버에게 응답받은 JSON 데이터를 자바스크립트 배열/객체로 자동 변환해줌
          axios.get('http://codingapple1.github.io/shop/data' + (props.clickCount + 2) + '.json')
                .then((결과) => { 
                  
                  let more_img = [...props.item_image];
                  let more_shoes = [...props.shoes];
                  결과.data.map((a, i) => {
                    more_shoes.push(a);
                    more_img.push('https://codingapple1.github.io/shop/shoes' + (a.id+1) +'.jpg')
                  });          
                  
                  props.change_shoes(more_shoes);
                  props.change_item_image(more_img);
                  props.change_isLoading(false);//로딩 중 UI 숨기기
                  props.change_clickCount(props.clickCount + 1); //클릭 카운트 증가
                })
                .catch(() => {
                  console.log('실패');
                  props.change_isLoading(false);//로딩 중 UI 숨기기
                })
        } else {
          props.change_isLoading(false);//로딩 중 UI 숨기기
          alert('상품이 더 이상 존재하지 않습니다.');
        }

      }}>상품추가</Button>
    </>
  )
}



//상품 목록 컴포넌트
function Product(props) {
  return (
    <Col>
      <img src={ props.select_img } width="80%" onClick={ () => { props.navigate('/detail/' + props.select_item.id) }}/>
      
      <h4>{ props.select_item.title }</h4>
      <p>{ props.select_item.price }</p>
    </Col>
  )
}



export default App
