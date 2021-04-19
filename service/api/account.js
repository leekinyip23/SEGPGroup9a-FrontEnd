import { USER_IP_ADDRESS, SERVER_PORT } from './apiConstant';

export const fetchAccountAPI = (userId) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/account/fetch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": `${userId}`
        })
    })
        .then(res => res.json());
}

export const updateAccountAPI = (userId,username, age ,password,gender,location) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/account/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": `${userId}`,
            "username": `${username}`,
            "age": `${age}`,
            "password": `${password}`,
            "gender": `${gender}`,
            "location": `${location}`
        })
    })
        .then(res => res.json());
}


