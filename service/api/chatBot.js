const USER_IP_ADDRESS = "192.168.68.151";

export const sendMessageAPI = ( message, isEvent ) => {
    return fetch(`http://${USER_IP_ADDRESS}:5000/send-msg`, {
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