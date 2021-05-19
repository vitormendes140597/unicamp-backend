const express = require('express');
const app = express();
const port = 3000;

const { EventHubProducerClient, EventHubConsumerClient } = require("@azure/event-hubs");
const eventHubKey = "Endpoint=sb://eh-unicamp.servicebus.windows.net/;SharedAccessKeyName=app;SharedAccessKey=zHdoYTI6IBMqWP0y31w4tyvWrRErVQ9DiMeEQp+/E5s=;EntityPath=eh-click";

async function send(req) {
    const producerClient = new EventHubProducerClient(eventHubKey);
    const batch = await producerClient.createBatch();
    const data = req.body;
    data.timestamp = new Date();

    batch.tryAdd(data);

    await producerClient.sendBatch(batch);
    await producerClient.close();
}

app.use(express.urlencoded());
app.use(express.json());

app.post('/dados', (req, res) => {

    console.log(req.body);
    send(req);
    res.json(req.body);

    // res.redirect(200,'index.html');

});
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`));