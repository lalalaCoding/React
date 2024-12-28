import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers : {
        changeCount(state, action) {
            // for (let item of state) {
            //     if (item.id == action.payload) item.count += 1;
            // }
            
            //배열에서 조건을 만족하는 인덱스 찾는 방법
            let 번호 = state.findIndex((a) => { return a.id == action.payload })
            state[번호].count++;
        },
        addCart(state, action) {
            console.log(action.payload);
            // for (let item of state) {
            //     if (item.id == action.payload.id) { //기존 상품을 장바구니에 추가한 경우
            //         item.count += action.payload.count;
            //         return; //함수 호출 종료
            //     }
            // }

            //리팩토링
            let 번호 = state.findIndex((a)=>{ return a.id == action.payload.id});
            if (번호 >= 0) {
                state[번호].count += action.payload.count;    
                return;
            }

            state.push(action.payload); //새로운 상품을 장바구니에 추가한 경우
        },
        removeCart(state, action) {
            let 번호 = state.findIndex((a) => {return a.id == action.payload});
            state.splice(번호, 1);
        }
    }
})
export default cart;
export let { changeCount, addCart, removeCart } = cart.actions;