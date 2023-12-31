const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/users')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://yrp:Test12345@cluster0.bedbk.mongodb.net/p02_curd_users?retryWrites=true&w=majority')

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}) 
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}) 

app.post('/creatUser', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch( err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate({_id: id}, { name: req.body.name, email: req.body.email, age: req.body.age })
    .then( users => res.json(users))
    .catch( err => res.json(err))
})
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch( err => res.json(err))
})


app.listen(PORT, () => console.log(`Server is running at ${PORT}`))