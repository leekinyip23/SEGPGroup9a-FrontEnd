import { USER_IP_ADDRESS, SERVER_PORT } from './apiConstant';

export const loginUserAPI = (username, password) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        })
    })
        .then(res => res.json());
}

export const registerUserAPI = (username, password) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/user/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        })
    })
        .then(res => res.json());
}