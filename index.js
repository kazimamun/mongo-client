const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
//upper code is common
app.use(cors());
app.use(bodyParser.json());

//database connection
const uri = "mongodb://firstDb:firstDb123@cluster0-shard-00-00-g1juc.mongodb.net:27017,cluster0-shard-00-01-g1juc.mongodb.net:27017,cluster0-shard-00-02-g1juc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const uri = "mongodb+srv://firstDb:firstDb123@cluster0-g1juc.mongodb.net/test?retryWrites=true&w=majority";




// const rootCall = (req, res) => res.send('hello world'); //single line arrow function.
// app.get('/', rootCall )
// you can write this function also below type.

app.get('/', (req, res) => {
    res.send('hello world with corona');
  });
//you can make another item with this command
app.get('/friends/plant/rofiq',(req,res) =>{
    res.send({name:'Rofiq', salary:'30000', post:'SAE'});
}) // this code will show in http://localhost:3000/friends/plant/rofiq

//dynamic object

const users = ['Arif', 'Zakir', 'Rofiq', 'Rakib'];
app.get('/users/:id',(req,res)=>{
    const id= req.params.id;
    const name = users[id];
    res.send({id, name});
})

//post
app.post('/addProduct',(req,result)=>{
    //saved to database
    const product = req.body;
    console.log(product);
    client.connect(err => {
      const collection = client.db("onlineStore").collection("product");
      // perform actions on the collection object
      collection.insertOne(product, (err, result)=>{
        console.log('Successfully Insterted', result); 
        result.send(product);
      });
      client.close();
    });
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('Listening to port 3000')); 