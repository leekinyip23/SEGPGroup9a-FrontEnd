import { USER_IP_ADDRESS, SERVER_PORT } from './apiConstant';

export const fetchJournalAPI = (userId) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/journal/fetch`, {
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

export const updateJournalAPI = (journalId, title, body, mood) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/journal/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "_id": `${journalId}`,
            "title": `${title}`,
            "body": `${body}`,
            "mood": `${mood}`
        })
    })
        .then(res => res.json());
}

export const deleteJournalAPI = (journalId) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/journal/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "_id": `${journalId}`
        })
    })
        .then(res => res.json());
}

export const addJournalAPI = (userId, title, body, mood) => {
    return fetch(`http://${USER_IP_ADDRESS}:${SERVER_PORT}/journal/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": `${userId}`,
            "title": `${title}`,
            "body": `${body}`,
            "mood": `${mood}`
        })
    })
        .then(res => res.json());
}