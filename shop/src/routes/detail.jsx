import {Container, Row, Col, Button, Form, Nav } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, Component, useState, useContext } from 'react';
import styles from './detail.module.css';

import {Context1} from './../App.jsx'; //컨텍스트(보관함) 가져오기



//컴포넌트의 Lifecycle
//mount(페이지에 장착), update(페이지에서 수정), unmount(페이지에서 제거)
class Detail extends Component { //과거에 사용하던 클래스형 컴포넌트
    componentDidMount() {
        //컴포넌트 mount 시 코드 실행부
    }
    componentDidUpdate() {
        //컴포넌트 update 시 코드 실행부
    }
    componentDidUnmount() {
        //컴포넌트 unmount 시 코드 실행부
    }
}

//스타일이 적용된 컴포넌트를 생성해주는 문법(라이브러리)
let YellowBtn = styled.button`
    background: ${ props => props.bg };
    color: ${ props => props.bg == 'blue' ? 'white' : 'black' };
    padding: 10px;
`;

//기존 스타일을 복사 후, 일부 수정 또는 새로 추가 가능
let NewBtn = styled(YellowBtn)`
    padding: 100px;
    border-radius: 3px;
`;

let Box = styled.div`
    background: grey;
    padding: 20px;
`;

//상품 상세보기 컴포넌트
function Product_Detail (props) {
    
    //Destructuring 문법
    let {재고} = useContext(Context1) //보관함 해체해주는 함수: 반환 값은 객체 타입
    

    let [display, setDisplay] = useState('block');
    let [count, setCount] = useState(0);
    let [amount, setAmount] = useState('');
    let [isNumber, setIsNumber] = useState(true);
    
    const changeAmount = (value) => {
        setAmount(value);
    }

    const changeIsNumber = (value) => {
        setIsNumber(value);
    }

    useEffect(() => {
        let a;
        if (display != 'none') {
            a = setTimeout(() => { setDisplay('none') }, 2000); //스위치 조작
        }
        
        setIsNumber(!isNaN(amount));

        return () => {
            //useEffect가 동작 전에 실행 될 코드 작성 (clean up fuction 이라고 부름)
            //mount시 실행X, unmount시 실행O
            clearTimeout(a); //기존 코드 제거
        }
    }, [amount])
    
    let {id} = useParams(); //쿼리 파라미터에 접근할 수 있는 Hook   
    let select_item; //경로 변수와 아이템 아이디가 일치하는 아이템 객체 저장
    let select_item_img; // 경로 변수와 아이템 아이디가 일치하는 아이템 이미지 정로 저장
    for (let item of props.shoes) {
        if (item.id == id) {
            select_item = item;
            select_item_img = props.item_image[item.id];
            break;
        }
    }

    return (
        <Container>
            {/* 2초가 지나면 아래 div가 사라지게 해보기 */}
            <div className="alert alert-warning" style={{display: display}}>
                2초 이내 구매 시 할인
            </div>
            
            <button onClick={ () => {setCount(count + 1) }}>버튼: {count}</button>

            {
                id >= props.shoes.length ? 
                <No_Product_Detail />
                : <Yes_Product_Detail 
                    select_item={select_item} select_item_img={select_item_img} 
                    isNumber={isNumber} changeAmount={changeAmount}/>   
            }
        </Container>
    )
}

function No_Product_Detail () {
    return (
        <Row>
            <Col>
                <div>No Image</div>
            </Col>
            <Col>
                <h4>존재하지 않는 상품입니다.</h4>
                <Button variant="danger">돌아가기</Button>
            </Col>
        </Row>
    )
}

function Yes_Product_Detail (props) {

    let [tab, setTab] = useState(0);
    let [fade, setFade] = useState('');

    useEffect(() => {
        let a = setTimeout(()=>{setFade('end');}, 100);

        return () => {
            clearTimeout(a);
            setFade('');
        }
    }, []);


    return (
        <>
            <Row className={`start ${fade}`}>
                <Box>
                    <YellowBtn bg="blue">버튼</YellowBtn>
                    <YellowBtn bg="orange">버튼</YellowBtn>
                </Box>
                <Col>
                    <img src={props.select_item_img} width="100%"/>
                </Col>
                <Col>
                    <h4 className="pt-5">{props.select_item.title}</h4>
                    <p>{props.select_item.content}</p>
                    <p>{props.select_item.price}원</p>

                    {
                        props.isNumber == false ? 
                        <div className={styles.alert_div}>경고: 숫자만 입력하세요.</div>
                        : null
                    }
                    <Form.Control type="text" className={styles.amout_input} onChange={e => {
                        props.changeAmount(e.target.value);
                    }}/>
                    &nbsp;&nbsp;

                    <Button variant="danger">주문하기</Button>
                </Col>
            </Row>

            {/* 동적 UI 탭 */}
            <Nav variant="tabs" defaultActiveKey="link1">
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {setTab(0);}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {setTab(1);}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link3" onClick={() => {setTab(2);}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <TabContent tab={tab}/>
         </>
    )
}

function TabContent({tab}) { //== 핵심 ==//
    
    let [fade, setFade] = useState('');
    let {재고} = useContext(Context1);

    useEffect(() => {
        let a = setTimeout(() => {setFade('end');}, 100); //오토매틱 배칭을 회피하기 위한 타이머
        
        return () => {
            clearTimeout(a);
            setFade('');
        }
    }, [tab])

    return (
        <>
            <div className={`start ${fade}`}>
                {
                    [<div className={`${styles.descript_div}`}>내용0</div>,
                    <div className={styles.descript_div}>내용1</div>,
                    <div className={styles.descript_div}>내용2</div>][tab]
                }
            </div>
        </>
    )
}





export default Product_Detail