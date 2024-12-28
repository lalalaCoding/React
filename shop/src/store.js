import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import cart from './store/cartSlice.js'

//useState()의 역할: state 하나를 slice라고 부른다.
createSlice({
    name : 'state이름',
    initialState : '값'
})

let stock = createSlice({
    name : 'stock',
    initialState: [10, 11, 12]
})

export default configureStore({
    // Slice 등록
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
    
   }
}) 