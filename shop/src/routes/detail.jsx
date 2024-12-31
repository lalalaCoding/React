import {Container, Row, Col, Button, Form, Nav } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import styles from './detail.module.css';

import { useDispatch } from 'react-redux';
import { addCart } from './../store/cartSlice.js'

import { useLike } from './../hooks/like.js'
import { useUserName } from '../hooks/username.js';

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
        // Detail 페이지에 접속 -> 해당 페이지의 상품id를 가져와서 localStorage의 watched 항목에 추가
        let watched = JSON.parse(localStorage.getItem('watched'));
        watched.unshift(select_item.id);
        let set_watched = [...new Set(watched)]; //배열->Set->배열
        localStorage.setItem('watched', JSON.stringify(set_watched));

        let a;
        if (display != 'none') {
            a = setTimeout(() => { setDisplay('none') }, 2000); //스위치 조작
        }
        
        setIsNumber(!isNaN(amount));

        return () => {
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
                    isNumber={isNumber} changeAmount={changeAmount} amount={amount}
                    />   
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
    
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [tab, setTab] = useState(0);
    let [fade, setFade] = useState('');

    //커스텀 훅: useXXX 함수들은 컴포넌트 내부이면서 JSX 외부에서만 사용가능함!
    let [like, addLike] = useLike();
    let [username, isError] = useUserName();
    //console.log(username);

    useEffect(() => {
        let a = setTimeout(()=>{setFade('end');}, 100);

        return () => {
            clearTimeout(a);
            setFade('');
        }
    }, []);

    return (
        <>
            {
                isError ? <h3>{username}</h3> : <h3>'서비스 요청 실패'</h3> 
            }
            <Row className={`start ${fade}`}>
                <Box>
                    <YellowBtn bg="blue">버튼</YellowBtn>
                    <YellowBtn bg="orange">버튼</YellowBtn>
                </Box>
                <Col>
                    <img src={props.select_item_img} width="100%"/>
                </Col>
                <Col>
                    <h4 className="pt-5">
                        {props.select_item.title} | {like}
                        <span onClick={() => { addLike() }}>❤️</span>
                    </h4>
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

                    <Button variant="danger" onClick={() => {
                        let 주문수량 = Number(props.amount);
                        let 주문상품 = props.select_item;
                        
                        //주문상품과 주문수량을 store.js에 전달
                        let 주문객체 = {
                            id: 주문상품.id,
                            name: 주문상품.title,
                            count: 주문수량
                        };

                        dispatch(addCart(주문객체));
                        navigate('/cart');
                    }}>주문하기</Button>
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