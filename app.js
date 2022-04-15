const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const {Customers, Interested} = require('./models');
const nodemailer = require('nodemailer');
const res = require('express/lib/response');


require('dotenv').config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function sendMail(email, message){

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'getintouchtrusta@gmail.com',
            pass:'Trust@9876'
        }
    })
    
    let mailOptions = {
        from: '<no-reply@trusta.com>',
        to: email,
        subject: 'I want to know more about trusta',
        text: message
    }
    
    
    await transporter.sendMail(mailOptions, function(err,data){
        if(err){
            console.log(err)
        }else{
            res.status(200).json('Mail sent')
        }
    })
}

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

app.post('/mail', (req,res) => {
    const {email, message} = req.body
    sendMail(email, message)
})

app.get('/email', (req,res) => {
    Interested.findAll()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.send(err)
    })
})

app.post('/email', (req,res) => {
    const {email, message} = req.body
    Interested.create({email,message})
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.send(err)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})