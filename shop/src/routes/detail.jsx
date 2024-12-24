import {Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

//상품 상세보기 컴포넌트
function Product_Detail (props) {

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
            {
                id >= props.shoes.length ? 
                    <No_Product_Detail /> : <Yes_Product_Detail select_item={select_item} select_item_img={select_item_img} />   
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
            <Col>
                <img src={props.select_item_img} width="100%" />
            </Col>
            <Col>
                <h4 className="pt-5">{props.select_item.title}</h4>
                <p>{props.select_item.content}</p>
                <p>{props.select_item.price}원</p>
                <Button variant="danger">주문하기</Button>
            </Col>
        </Row>
    )
}




export default Product_Detail