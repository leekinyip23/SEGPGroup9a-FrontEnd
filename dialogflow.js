const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express()
const port = 5000
const sessionId = uuid.v4();

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

app.post('/send-msg', (req, res) => {

    dialogflowConnection(req.body.text, req.body.isEvent)
        .then(data => {

            // if (isSaveJournal) {
            //     functionToSaveToMongoDB(req.body.message)

            //     isSaveJournal = false;
            // }
            let mood = 2;
            let isSaveJournal = false;
            let isSaveToDB = false;

            if (data.intent.displayName.includes("Negative")) {
                mood = -1
            } else if (data.intent.displayName.includes("Neutral")) {
                mood = 0
            } else if (data.intent.displayName.includes("Positive")) {
                mood = 1
            }

            if (data.intent.displayName === "Negative-Share(Yes)" ||
                data.intent.displayName === "Negative-Share(Yes)-ContinueShare(Yes)" ||
                data.intent.displayName === "Neutral(No)-Journal(Yes)" ||
                data.intent.displayName === "Positive-Share(Yes)"

            ) {
                isSaveJournal = true
            }

            if (data.intent.displayName === "Negative-Share(Yes)-ContinueShare(Yes)-Journal(Yes)-End" ||
                data.intent.displayName === "Negative-Share(Yes)-ContinueShare(No)-Journal(Yes)-End" ||
                data.intent.displayName === "Neutral(No)-Journal(Yes)-End" ||
                data.intent.displayName === "Positive-Share(Yes)-Journal(Yes)-End"
            ) {
                isSaveToDB = true
            }

            res.send({
                message: data.fulfillmentMessages,
                mood: mood,
                isSaveJournal: isSaveJournal,
                isSaveToDB: isSaveToDB
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

    if (isEvent === "true") {
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

    console.log("******************************************************************")
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