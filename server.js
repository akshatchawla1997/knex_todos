const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 8002;
const app = express();
const knex = require('./db/knex');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
    res.send("Up and running");
});

app.get('/todos', (req, res) => {
   knex.select().from('todos').then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
    });
});

app.post('/todos', (req, res)=>{
    knex('todos').insert({
        title:'c++ is a good language',
        user_id: 1
    }).then((result)=>{
        res.send(result)
    })
})

app.get('/todos/:id', (req, res) => {
    knex.select().from('todos').where('id', req.params.id).then((result) => {
         res.send(result)
     }).catch((error) => {
         console.log(error);
         res.status(500).send("Internal Server Error");
     });
 });

 app.put('/todos/:id', (req, res) => {
    knex('todos').where('id', req.params.id).update({
        title:req.body.title,
        completed:req.body.completed
    }).then(() => {
         knex.select().from('todos').then((result)=>{
            res.send(result)
         })
     }).catch((error) => {
         console.log(error);
         res.status(500).send("Internal Server Error");
     });
 });

 app.delete('/todos/:id', (req,res)=>{
    knex('todos').where('id', req.params.id).del().then(() => {
        knex.select().from('todos').then((result)=>{
           res.send(result)
        })
    }).catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
    });
 })

app.get('/todos-of-user/:id', (req, res)=>{
    knex.from('todos')
        .innerJoin('user', 'todos.user_id', 'users.id')
        .where('todos.user_id', req.params.id)
        .then((result)=>{
            res.send(result)
        })
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
