const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express()
const port = 5000
// A unique identifier for the given session
const sessionId = uuid.v4();

// 0 --> neutral
// 1 --> positive
// 2 --> negative
// 3 --> dummy value
let mood = 3
let isSaveJournal = false

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// POST request 
// '/send-msg'
// '/send-msg/neutralno-journalyes'
// '/send-msg/positive-shareyes'
// '/send-msg/negative-sharedyes'
// '/send-msg/negative-sharedyes-continueshareyes'

app.post('/send-msg', (req, res) => {
    dialogflowConnection(req.body.text).then(data => {
        // if (isSaveJournal) {
        //     functionToSaveToMongoDB(req.body.message)

        //     isSaveJournal = false;
        // }

        if (data.intent.displayName === "Neutral(?)") {
            mood = 0
        } else if (data.intent.displayName === "Positive-Share(?)") {
            mood = 1
        } else if (data.intent.displayName === "Negative-Share(?)") {
            mood = 2
        }

        if (data.intent.displayName === "Negative-Shared(Yes)" || data.intent.displayName === "Negative-Shared(Yes)-ContinueShare(Yes)") {
            isSaveJournal = true
        } else if (data.intent.displayName === "Positive-Share(Yes)") {
            isSaveJournal = true
        } else if (data.intent.displayName === "Neutral(No)-Journal(Yes)") {
            isSaveJournal = true
        } else {
            isSaveJournal = false
        }

        res.send({
            message: data.fulfillmentMessages,
            mood: mood,
            isSaveJournal: isSaveJournal,
        })
        // res.json({
        //     "message": `${data}`
        // })
    })
})

app.post('/send-msg/neutralno-journalyes', (req, res) => {
    dialogflowConnectionNeutralEvent("NeutralNo-JournalYes").then(data => {
        res.send({
            message: data.fulfillmentMessages,
            mood: 3,
            isSaveJournal: false,
        })
    })
})

app.post('/send-msg/positive-shareyes', (req, res) => {
    dialogflowConnectionPositiveEvent("Positive-ShareYes").then(data => {
        res.send({
            message: data.fulfillmentMessages,
            mood: 3,
            isSaveJournal: false,
        })
    })
})

app.post('/send-msg/negative-sharedyes', (req, res) => {
    dialogflowConnectionNegativeEvent("Negative-SharedYes").then(data => {
        res.send({
            message: data.fulfillmentMessages,
            mood: 3,
            isSaveJournal: false,
        })
    })
})

app.post('/send-msg/negative-sharedyes-continueshareyes', (req, res) => {
    dialogflowConnectionNegativeEventContinue("Negative-SharedYes-ContinueShareYes").then(data => {
        res.send({
            message: data.fulfillmentMessages,
            mood: 3,
            isSaveJournal: false,
        })
    })
})

// i am sending different request (trigger using "event or text") , 
// so is this the correct way to implement it ?
// different "async function" for different request ??? 
async function dialogflowConnection(msg, projectId = 'mental-health-care-chatbo-rqfi') {

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./mental-health-care-chatbo-rqfi-e3c6ef10a30c.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: msg,
                languageCode: 'en-US',
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    return result;
}

async function dialogflowConnectionNeutralEvent(msg, projectId = 'mental-health-care-chatbo-rqfi') {

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./mental-health-care-chatbo-rqfi-e3c6ef10a30c.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: msg,
                languageCode: 'en-US'
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    return result;
}


async function dialogflowConnectionPositiveEvent(msg, projectId = 'mental-health-care-chatbo-rqfi') {

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./mental-health-care-chatbo-rqfi-e3c6ef10a30c.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: msg,
                languageCode: 'en-US'
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    return result;
}

async function dialogflowConnectionNegativeEvent(msg, projectId = 'mental-health-care-chatbo-rqfi') {

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./mental-health-care-chatbo-rqfi-e3c6ef10a30c.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: msg,
                languageCode: 'en-US'
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    return result;
}

async function dialogflowConnectionNegativeEventContinue(msg, projectId = 'mental-health-care-chatbo-rqfi') {

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./mental-health-care-chatbo-rqfi-e3c6ef10a30c.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: msg,
                languageCode: 'en-US'
            },
        },
    };
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }


    return result;
}

app.listen(port, () => {
    console.log("running on port " + port)
})