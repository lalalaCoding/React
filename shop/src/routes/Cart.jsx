import {Table, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeName, changeAge } from './../store/userSlice.js'
import { changeCount, removeCart } from './../store/cartSlice.js'
import { useState, memo, useMemo } from 'react';

//자식 컴포넌트
// memo(컴포넌트 정의)
//  ->특정 상황에서만 재렌더링하게 함
//  ->컴포넌트에게 전파되는 props가 변할 때만 재렌더링하게 함
//  ->Props가 길고 복잡할 때는 사용X
let Child = memo( function() {
    console.log('자식 컴포넌트 재렌더링')
    return (
        <div>자식임</div>
    )
}) 

function 함수() {
    return '반복문 10억회 돌린 결과'
}



//장바구니 컴포넌트
function Cart() {

    let result = 함수();
    //useMemo(() => {return 함수()}, [state]); //컴포넌트 렌더링 시 1회만 실행(useEffect와 실행시점 차이만 있음)

    let [count, setCount] = useState(0); 

    //Redux Store를 가져와주는 훅
    let a = useSelector((state) => { return state; })
    let dispatch = useDispatch(); //store.js에게 요청을 보내주는 훅훅

    return (
        <div>
            <Child count={count}/>
            <button onClick={() => {setCount(count+1)}}>+</button>
            <h5>
                {a.user.name}의 장바구니({a.user.age})
                <button onClick={() => {dispatch(changeName())}}>이름변경</button>
                <button onClick={() => {dispatch(changeAge(100))}}>나이변경</button>
            </h5>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        a.cart.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.count}</td>
                                    <td>
                                        <Button onClick={(e) => {
                                            let pNo = e.target.parentElement.parentElement.children[0].innerText;
                                            console.log(pNo)
                                            dispatch(changeCount(pNo));
                                        }}>+</Button>

                                        <Button variant='danger' onClick={(e) => {
                                            let pNo = e.target.parentElement.parentElement.children[0].innerText;    
                                            dispatch(removeCart(pNo));
                                        }}>
                                        삭제</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;