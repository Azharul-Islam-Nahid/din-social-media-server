const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// middlewares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktpwcuu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const usersCollection = client.db('dinSocialMedia').collection('users');
        const postsCollection = client.db('dinSocialMedia').collection('posts');



        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })


        app.post('/userpost', async (req, res) => {
            const user = req.body;
            const result = await postsCollection.insertOne(user);
            res.send(result);
        })


        app.get('/userpost', async (req, res) => {
            const query = {}
            const posts = await postsCollection.find(query).toArray();
            res.send(posts)
        })


        app.get('/user', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const userInfo = await usersCollection.find(query).toArray();
            res.send(userInfo);
        })


    }

    finally {

    }
}

run().catch(console.log);



app.get('/', (req, res) => {
    res.send('Din social media server running');
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})