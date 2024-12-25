import {Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, Component, useState } from 'react';
import styles from './detail.module.css';

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
        let a = setTimeout(() => { setDisplay('none') }, 2000); //스위치 조작
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

    return (
        <Row>
            <Box>
                <YellowBtn bg="blue">버튼</YellowBtn>
                <YellowBtn bg="orange">버튼</YellowBtn>
            </Box>
            <Col>
                <img src={props.select_item_img} width="100%" />
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
    )
}




export default Product_Detail