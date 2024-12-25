import { useState } from 'react'
import './App.module.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
//import 작명 from '이미지경로';
import bg from './img/bg2.gif';
import {data, imgPath} from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Product_Detail from './routes/detail.jsx'
import { ShopEvent, FirstEvent, BirthEvent } from './routes/event.jsx';

function App() {
  
  let [shoes, setShoes] = useState(data); //객체 배열
  let [item_image, setItem_image] = useState(imgPath); //배열
  let navigate = useNavigate(); //Hook, 페이지 이동을 도와줌

  const change_shoes = (value) => {
    setShoes(value);
  }
  const change_item_image = (value) => {
    setItem_image(value);
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
        <Route path="/" element={<MainPage shoes={shoes} change_shoes={change_shoes} item_image={item_image} change_item_image={change_item_image} navigate={navigate}/>} />
        
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
  return (
    <>
      <div className="main-bg" style={{backgroundImage : 'url(' + bg + ')'}}></div>

      <Container>
        <Row>
          { //상품 목록 출력
            props.shoes.map(function(item, index) {
              return (
              <Product select_item={props.shoes[index]} select_img={props.item_image[index]} index={index} navigate={props.navigate}/>
              )
            })
          }
        </Row>
      </Container>

      <Button variant='warning' onClick={ () => { 
        let shoes_copy = [...props.shoes];
        shoes_copy.sort((a, b) => {
          return a.title.localeCompare(b.title); //상품명 오름차순 정렬
        });
        props.change_shoes(shoes_copy);
        
        console.log(shoes_copy);
        let image_copy = [];
        for (let s of shoes_copy) {
          let shoe_id = s.id;
          for (let i of props.item_image) {
              if(i.includes('shoes' + (shoe_id + 1) + '.jpg')) image_copy.push(i);
          }
        }
        props.change_item_image(image_copy);

       }}>상품 정렬</Button>
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
