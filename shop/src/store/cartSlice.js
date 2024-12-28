import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers : {
        changeCount(state, action) {
            for (let item of state) {
                if (item.id == action.payload) item.count += 1;
            }
        },
        addCart(state, action) {
            console.log(action.payload);
            for (let item of state) {
                if (item.id == action.payload.id) { //기존 상품을 장바구니에 추가한 경우
                    item.count += action.payload.count;
                    return; //함수 호출 종료
                }
            }

            state.push(action.payload); //새로운 상품을 장바구니에 추가한 경우
        }
    }
})
export default cart;
export let { changeCount, addCart } = cart.actions;