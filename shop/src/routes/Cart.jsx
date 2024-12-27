import {Table, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';

//장바구니 컴포넌트
function Cart() {

    //Redux Store를 가져와주는 훅
    let a = useSelector((state) => { return state; })
    console.log(a);

    return (
        <div>
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
                                    <td>{i + 1}</td>
                                    <td>{a.name}</td>
                                    <td>{a.count}</td>
                                    <td><Button>변경하기</Button></td>
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