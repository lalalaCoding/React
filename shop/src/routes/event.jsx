import { Outlet } from 'react-router-dom';

function ShopEvent () {
    return (
        <>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </>
    )
}

function FirstEvent () {
    return (
        <p>첫 주문시 양배추즙 서비스</p>
    )
}

function BirthEvent() {
    return (
        <p>생일기념 쿠폰 받기</p>
    )
}


export { ShopEvent, FirstEvent, BirthEvent }