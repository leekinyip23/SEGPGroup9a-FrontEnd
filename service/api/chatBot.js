import { USER_IP_ADDRESS, SERVER_PORT } from './apiConstant';

export const sendMessageAPI = (message, isEvent) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/chatbot/send-msg`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "text": `${message}`,
            "isEvent": `${isEvent}`
        })
    })
        .then(res => res.json());
}