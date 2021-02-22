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
    console.log(req.body.text)
        dialogflowConnection(req.body.text, req.body.isEvent)
            .then(data => {
                console.log("ran")
                // if (isSaveJournal) {
                //     functionToSaveToMongoDB(req.body.message)
        
                //     isSaveJournal = false;
                // }
                let mood = 3;
                let isSaveJournal = false;
        
                if (data.intent.displayName === "Neutral(?)") {
                    mood = 0
                } else if (data.intent.displayName === "Positive-Share(?)" || 
                    data.intent.displayName === "Positive-Share(Yes)" ||
                    data.intent.displayName === "Positive-Share(Yes)-Journal(?)"
                ) {
                    mood = 1
                } else if (data.intent.displayName === "Negative-Share(?)" || 
                    data.intent.displayName === "Negative-Shared(Yes)" ||
                    data.intent.displayName === "Negative-Shared(Yes)-ContinueShare(Yes)"
                ) {
                    mood = -1
                }
                console.log(mood)
                console.log( data.intent.displayName)
        
                if (data.intent.displayName === "Negative-Shared(Yes)" || 
                    data.intent.displayName === "Negative-Shared(Yes)-ContinueShare(Yes)" || 
                    data.intent.displayName === "Positive-Share(Yes)" || 
                    data.intent.displayName === "Neutral(No)-Journal(Yes)"
                ) {
                    isSaveJournal = true
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
            .catch(err => {
                console.log("Error!")
                res.send({
                    error: err
                })
            })
})

// i am sending different request (trigger using "event or text") , 
// so is this the correct way to implement it ?
// different "async function" for different request ??? 
async function dialogflowConnection(msg, isEvent, projectId = 'mental-health-care-chatbo-rqfi') {
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./mental-health-care-chatbo-rqfi-e3c6ef10a30c.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: msg,
                languageCode: 'en-US'
            },
        },
    }

    if(isEvent === "true") {
        request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: msg,
                    languageCode: 'en-US',
                },
            },
        }
    }

    console.log(request)

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