const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    console.log(`Received event ${req.body.type}`);

    const {type, data} = req.body;
    let moderatedStatus;

    if (type === 'commentCreated') {
        const {status, content, ...rest} = data;

        console.log(`Start moderating comment ${content}`);

        setTimeout(() => {
            if (content.includes('fuck')) {
                moderatedStatus = 'rejected';
            } else {
                moderatedStatus = 'approved';
            }

            console.log(`Moderating finished`, {...rest, status: moderatedStatus});

            axios.post('http://event-bus-srv:4005/events', {
                type: 'commentModerated',
                data: {...rest, content, status: moderatedStatus}
            }).catch(err => {
                console.log(err);
            })
        }, 5000)
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Comment Moderator service listening on 4003');
});
