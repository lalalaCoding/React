import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeName(state) {
            //return {name : 'park', age : 20}
            state.name = 'park' // 스테이트 직접 변경(Immer.js 라이브러리도 같이 설치되어서)
        },
        changeAge(state, action) {
            state.age += action.payload
        }
    }
})
export let { changeName, changeAge } = user.actions;
export default user;