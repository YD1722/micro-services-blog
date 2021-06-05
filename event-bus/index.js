const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const eventBusDataStore = [];

app.post('/events', async (req, res) => {
    const event = req.body;

    eventBusDataStore.push(event);
    try {
        await Promise.all([
            axios.post(`http://post-srv:4000/events`, event),
            axios.post(`http://comment-srv:4001/events`, event),
            axios.post(`http://query-srv:4002/events`, event),
            axios.post(`http://comment-mod-srv:4003/events`, event)
        ]);

        res.send({status: 'OK'})

    } catch (e) {
        res.send({status: 'event distribution failed'})
    }
});

app.get('/events', (req, res) => {
    res.send(eventBusDataStore);
});

app.listen(4005, () => {
    console.log('Event bus listening on 4005');
});
