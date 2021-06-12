const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

let handleEvent = (type, data) => {
    console.log(`handling event ${type}`);

    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }

    if (type === 'commentCreated') {
        const {id, content, postId, status} = data;

        posts[postId].comments.push({
            id, content, status
        })
    }

    if (type === 'commentUpdated') {
        const {id, postId, ...rest} = data;

        let currentCommentIdx = posts[postId].comments.findIndex((comment) => {
            return comment.id === id;
        });

        if (currentCommentIdx > -1) {
            posts[postId].comments[currentCommentIdx] = {id, postId, ...rest}
        }
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log('Query service listening on 4002');
    console.log('Getting all events from event-bus');

    try {
        const res = await axios.get('http://event-bus-srv:4005/events');

        if (res && res.data) {
            res.data.forEach(event => {
                handleEvent(event.type, event.data);
            });
        }
    } catch (e) {
        console.log(`Getting all events from event-bus failed : ${e}`);
    }
});
