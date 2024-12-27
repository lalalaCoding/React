import { configureStore, createSlice } from '@reduxjs/toolkit'

//useState()의 역할: state 하나를 slice라고 부른다.
createSlice({
    name : 'state이름',
    initialState : '값'
})
let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let stock = createSlice({
    name : 'stock',
    initialState: [10, 11, 12]
})

let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ]
})




export default configureStore({
    // Slice 등록
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
    
   }
}) 