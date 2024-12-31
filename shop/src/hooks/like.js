import { useState } from 'react'

//커스텀 훅
export function useLike() {
    ///실행부에서 useXXX() 를 사용하고 있다면 함수명도 useXXX로 작명 (관습, 강제)
    let [like, setLike] = useState(0);
    function addLike() {
        setLike(a => a + 1);
    }

    return [like, addLike];
}