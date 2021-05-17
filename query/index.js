const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }

    if (type === 'commentCreated') {
        const {id, content, postId} = data;

        posts[postId].comments.push({
            id, content
        })
    }

    res.send({});
});

app.listen(4002, () => {
    console.log('Query service listening on 4002');
});
