import { USER_IP_ADDRESS, SERVER_PORT } from './apiConstant';

export const updateAccountAPI = (id, nickname, age, gender, location, password) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/user/updateId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "_id": `${id}`,
            "nickname": `${nickname}`,
            "age": `${age}`,
            "gender": `${gender}`,
            "location": `${location}`,
            "password": `${password}`
        })
    })
        .then(res => res.json());
}


