import {Table, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeName, changeAge } from './../store/userSlice.js'
import { changeCount, removeCart } from './../store/cartSlice.js'

//장바구니 컴포넌트
function Cart() {

    //Redux Store를 가져와주는 훅
    let a = useSelector((state) => { return state; })
    let dispatch = useDispatch(); //store.js에게 요청을 보내주는 훅훅


    return (
        <div>
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