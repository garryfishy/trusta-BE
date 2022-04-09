const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const {Customers} = require('./models');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/customers', (req,res) => {
    Customers.findAll()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.send(err)
    })
})

app.post('/testimony', (req,res) => {
    const {name, logo, testimony} = req.body
    const data = {
        name,logo,testimony
    }
    Customers.create(data)
    .then(data => res.status(200).json(data))
    .catch(err => {
        res.send(err)
    })
})

app.delete('/testimony/:id', (req,res)=> {
    const {id} = req.params
    Customers.destroy({where: {id}})
    .then(data => {
        res.send('Data deleted')
    })
    .catch(err => {
        res.send(err)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})