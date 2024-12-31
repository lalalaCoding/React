import axios from 'axios'
import { useState } from 'react';

export function useUserName() {
    let [username, setUsername] = useState('');
    let [isError, setIsError] = useState(false);
    axios.get('/username11.json')
            .then((a) => {setUsername(a.data)})
            .catch(() => {setIsError(true)})
    
    return [username, isError];
}