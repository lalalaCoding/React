import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
//import 작명 from '이미지경로';
import bg from './img/bg2.gif';
//하나를 import 하려면 : import 작명 from '파일경로';
//여러개를 import 하려면 : import {변수1, 변수2} from '파일경로'; -> 변수명을 export와 일치
import {data, imgPath} from './data.js'



function App() {
  
  let [shoes] = useState(data); //객체 배열
  let [item_image] = useState(imgPath); //배열

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">React Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#Product">Product</Nav.Link>
            <Nav.Link href="#Order">Order</Nav.Link>
            <Nav.Link href="#MyInfo">MyInfo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg" style={{backgroundImage : 'url(' + bg + ')'}}></div>

      <Container>
        <Row>
          { //상품 목록 출력
            shoes.map(function(item, index) {
              return (
              <Product select_item={shoes[index]} select_img={item_image[index]} />
              )
            })
          }
        </Row>
      </Container>


    </div>    
  )
}

//상품 목록 컴포넌트
function Product(props) {
  return (
    <Col>
      <img src={ props.select_img } width="80%"/>
      <h4>{ props.select_item.title }</h4>
      <p>{ props.select_item.price }</p>
    </Col>
  )
}



export default App
