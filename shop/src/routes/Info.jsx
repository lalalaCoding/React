import { useState, useTransition, useDeferredValue } from 'react'



let a = new Array(10000).fill(0);


function Info() {
    let [name, setName] = useState('')
    let [isPending, startTransition] = useTransition() //[boolean, TransitionStartFunction]
    let state = useDeferredValue(name)//매개변수 값이 변화했을 때 늦게 처리해줌

    return (
        <div className="App">
            <input onChange={e => { 
                startTransition(() => {
                    setName(e.target.value); //실행 시점을 뒤로 미뤄줌
                }) //스테이트 변경 함수를 startTransition()의 콜백함수로 작성하기
            }} />
            { //성능 저하 일으키기
                isPending ? 
                '로딩중' : 
                a.map(() => {
                    return <div>{state}</div>
                })
            }
            {
            
            }
        </div>
    )
}

export default Info;