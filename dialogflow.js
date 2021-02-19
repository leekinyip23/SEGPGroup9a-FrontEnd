const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express()
const port = 5000

// A unique identifier for the given session
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

let isSaveJournal = false;

app.post('/send-msg', (req, res) => {
    runSample(req.body.text).then(data => {
        if(isSaveJournal) {
            functionToSaveToMongoDB(req.body.message)

            isSaveJournal = false;
        }

        if(data.intent === "Negative-wfqefwe") {
            isSaveJournal = true;
        }


        res.send({
            message: data.fulfillmentMessages,
            isSaveJournal: isSaveJournal,
        })
        // res.json({
        //     "message": `${data}`
        // })
    })
})

app.get('/', (req, res) => {
    res.send("HELLO")
    console.log("Hello")
})

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg, projectId = 'mental-health-care-chatbo-rqfi') {

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./mental-health-care-chatbo-rqfi-e3c6ef10a30c.json"
    });
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: msg,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
            /*
                        event: {
                            name: "GG",
                            languageCode: 'en-US'
                        },*/
        },
    };

    // Send request and log result
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